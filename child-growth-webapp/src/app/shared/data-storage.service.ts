import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

export interface Child {
    name: string,
    birthDate: Date,
    gender: string
}

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private userDoc: AngularFirestoreDocument<any>;
    private childCollection: AngularFirestoreCollection<any>;
    childs: Observable<Child[]>;

    constructor(private afs: AngularFirestore, private authService: AuthService) {
    }

    listChilds() {
        return new Promise<any>((resolve, reject) => {
            try {
                this.childCollection = this.afs.collection<any>('/users/' + this.authService.getUID() + '/childs');
                this.childs = this.childCollection.valueChanges();
                resolve(this.childs);
            }
            catch (error) {
                reject(error);
            }
        })
    }


    createChild(pName: string, birthDate: Date, pGenero: string) {
        return new Promise<any>((resolve, reject) => {
            if (pName == null || pName.trim().length == 0) {
                reject("Error: Nome nao pode ser nulo");
            }
            else if (birthDate == null) {
                reject("Error: Data de Nascimento nao pode ser nulo");
            }
            else if (pGenero == null || pGenero.trim().length == 0) {
                reject("Error: Genero nao pode ser nulo");
            }
            else {
                console.log("getUID: "+this.authService.getUID());
                this.userDoc = this.afs.doc<any>("/users/" + this.authService.getUID());
                this.userDoc.collection<any>('childs').add({
                    name: pName,
                    birthDate: birthDate,
                    gender: pGenero
                })
                .then((success) => {
                    console.log("sucesso ao cadastrar child: "+success);
                    resolve("child criado com sucesso");
                })
                .catch((error) => {
                    console.log("Erro ao criar child: "+error);
                    reject(error)
                });
            }
        });
    }
}