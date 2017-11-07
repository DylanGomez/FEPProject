import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: Observable<firebase.User>;
  afAuth: AngularFireAuth;

  constructor(afAuth: AngularFireAuth) {
    this.afAuth = afAuth;
    firebase.auth().onAuthStateChanged(function (newUser) {
      this.user = newUser;
    });

    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = this.afAuth.authState;
      } else {
        this.user = null;
      }
    });
  }

  public isLoggedIn(): boolean {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  public login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
