import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private itemDoc: AngularFirestoreDocument<any>;

    constructor(private afs: AngularFirestore, private authService: AuthService) {
    }

    createChild(pName: string, pDtNascimento: Date, pGenero: string) {
        return new Promise<any>((resolve, reject) => {
            if (pName == null || pName.trim().length == 0) {
                reject("Error: Nome nao pode ser nulo");
            }
            else if (pDtNascimento == null) {
                reject("Error: Data de Nascimento nao pode ser nulo");
            }
            else if (pGenero == null || pGenero.trim().length == 0) {
                reject("Error: Genero nao pode ser nulo");
            }
            else {
                this.itemDoc = this.afs.doc<any>("/users/" + this.authService.getUID());
                this.itemDoc.collection<any>('childs').add({
                    name: pName,
                    dtNascimento: pDtNascimento,
                    gender: pGenero
                });
                resolve("child criado com sucesso");
            }
        });
    }
}