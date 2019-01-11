import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  user = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    afAuth.auth.onAuthStateChanged(function (pUser) {
      console.log("[AuthService].construtor onAuthStateChanged...user: "+pUser);
      if (pUser) {
        // User is signed in.
        this.user = pUser;
      } else {
        // No user is signed in.
        this.user = null;
      }
    });
  }

  // autenticacao com facebook
  /* doFacebookLogin() {
     return new Promise<any>((resolve, reject) => {
       let provider = new firebase.auth.FacebookAuthProvider();
       this.afAuth.auth
         .signInWithPopup(provider)
         .then(res => {
           resolve(res);
         }, err => {
           console.log(err);
           reject(err);
         })
     })
   }*/
  // autenticacao com google
  /* doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }*/
  // registro de novo usuário com chave e senha
  signupUser(email: string, password: string, name: string) {
    return new Promise<any>((resolve, reject) => {
      console.log(name);
      console.log(name == null || name.trim().length == 0);
      if (name == null || name.trim().length == 0) {
        reject("Error: Nome nao pode ser nulo" );
      }
      else {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
          .then(res => {
            this.afs.doc<any>('users/' + res.user.uid).set({
              username: name,
              email: email
              //some more user data
            });
            this.user = this.afAuth.auth.currentUser;
            this.afAuth.auth.currentUser.getIdToken()
              .then(token => {
                this.token = token;
              });
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      }
    })
  }

  signinUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          this.user = this.afAuth.auth.currentUser;
          this.afAuth.auth.currentUser.getIdToken()
            .then(token => {
              this.token = token;
            });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getToken() {
    this.afAuth.auth.currentUser.getIdToken()
      .then(token => {
        this.token = token;
      });

    return this.token;
  }

  getUID() {
    if (this.user != null){
      return this.user.uid;
    }
    return null;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.token = null;
    this.user = null;
  }

  isAuthenticated() {
    return this.user != null;
  }
}
