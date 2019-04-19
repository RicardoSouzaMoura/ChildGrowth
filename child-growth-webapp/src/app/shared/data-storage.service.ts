import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';

export interface Measure {
    measure: number,
    date: firestore.Timestamp
}

export interface Child {
    id?: string,
    name: string,
    birthDate: firestore.Timestamp,
    gender: string,
    heightsForDate?: Measure[],
    weightsForDate?: Measure[]
}

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private userDoc: AngularFirestoreDocument<any>;
    childs: Child[];

    constructor(private afs: AngularFirestore, private authService: AuthService) {
    }

    listChilds() {
        let childCollection: AngularFirestoreCollection<any>;
        childCollection = this.afs.collection<any>('/users/' + this.authService.getUID() + '/childs');
        return childCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as { name: string, birthDate: firestore.Timestamp, gender: string };
                const id = a.payload.doc.id;
                return { id, ...data } as Child;
            }))
        );
    }
    createChild(child: Child) {
        return new Promise<any>((resolve, reject) => {
            if (child.name == null || child.name.trim().length == 0) {
                reject("Error: Nome nao pode ser nulo");
            }
            else if (child.birthDate == null) {
                reject("Error: Data de Nascimento nao pode ser nulo");
            }
            else if (child.gender == null || child.gender.trim().length == 0) {
                reject("Error: Genero nao pode ser nulo");
            }
            else {
                console.log("getUID: " + this.authService.getUID());
                this.userDoc = this.afs.doc<any>("/users/" + this.authService.getUID());
                this.userDoc.collection<any>('childs').add({
                    name: child.name,
                    birthDate: child.birthDate,
                    gender: child.gender
                })
                    .then((firestoreChild) => {
                        console.log("sucesso ao cadastrar child: " + firestoreChild.id);
                        /*child.heightsForDate.forEach(measure => {
                            firestoreChild.collection('heightsForDate').add(measure);
                        });
                        child.weightsForDate.forEach(measure => {
                            firestoreChild.collection('weightsForDate').add(measure);
                        });*/
                        resolve(firestoreChild);
                    })
                    .catch((error) => {
                        console.log("Erro ao criar child: " + error);
                        reject(error)
                    });
            }
        });
    }

    editChild(pChild: Child) {
        return new Promise<any>((resolve, reject) => {
            if (pChild.name == null || pChild.name.trim().length == 0) {
                reject("Error: Nome nao pode ser nulo");
            }
            else if (pChild.birthDate == null) {
                reject("Error: Data de Nascimento nao pode ser nulo");
            }
            else if (pChild.gender == null || pChild.gender.trim().length == 0) {
                reject("Error: Genero nao pode ser nulo");
            }
            else if (pChild.id == null || pChild.id.trim().length == 0){
                reject("Error: Id do filho não pode ser nulo");
            }
            else {
                console.log("getUID: " + this.authService.getUID());
                this.userDoc = this.afs.doc<any>("/users/" + this.authService.getUID());
                let lChild = this.userDoc.collection<any>('childs').doc(pChild.id)
                lChild.update({
                    name: pChild.name,
                    birthDate: pChild.birthDate,
                    gender: pChild.gender
                })
                    .then(() => {
                        console.log("sucesso ao atualizar child: "+pChild.id);
                        resolve();
                    })
                    .catch((error) => {
                        console.log("Erro ao criar child: " + error);
                        reject(error)
                    });
            }
        });
    }

    // metodo para trazer as medidas registradas pelo usuário
    listChildMeasure(yearNow, childId, measureType) {
        let yearFrom = yearNow - 2;
        let yearTo = yearNow + 2;

        console.log("chart - yearFrom: " + yearFrom + ", yearTo: " + yearTo);
        console.log('/users/' + this.authService.getUID() + "/childs/" + childId + "/" + measureType);

        let startDate = new Date(yearFrom, 0, 1);
        let endDate = new Date(yearTo, 11, 31);

        let itemsCollection: AngularFirestoreCollection<any>;
        itemsCollection = this.afs.collection<any>('/users/' + this.authService.getUID() + "/childs/" + childId + "/" + measureType,
            ref => ref.where('date', '>=', startDate)
                .where('date', '<=', endDate)
                .orderBy('date')
        );
        return itemsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as { measure: number, date: firestore.Timestamp };
                const id = a.payload.doc.id;
                return { id, ...data } as Measure;
            }))
        );
    }

    // metodo para trazer os dados estaticos carregados da WHO
    listChartData(yearDif, gender, table) {
        let monthFrom = (yearDif - 2 >= 0) ? yearDif - 2 : 0;
        monthFrom = monthFrom * 12;
        let monthTo = (yearDif + 2) * 12;
        console.log("chart table: " + table + " - gender: " + gender + ", monthFrom: " + monthFrom + ", monthTo: " + monthTo);
        let itemsCollection: AngularFirestoreCollection<any>;
        itemsCollection = this.afs.collection<any>(table,
            ref => ref.where('gender', '==', gender)
                .where('month', '<=', monthTo)
                .where('month', '>=', monthFrom)
                .orderBy('month')
        );
        return itemsCollection.valueChanges();
    }

    getChildById(childId): Observable<Child> {
        let child = this.afs.doc<Child>("/users/" + this.authService.getUID() + "/childs/" + childId);
        return child.valueChanges();
    }

}