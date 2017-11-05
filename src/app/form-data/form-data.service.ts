import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { NavController, AlertController } from 'ionic-angular';

@Injectable()
export class FormDataService {

  public db = firebase.firestore();
  
  public testingMode = true;
  constructor(
    af: AngularFirestore) {}

  public Toevoegen(id, name): void {
    this.db.collection('hardware').add({
      id: id,
      name: name,
      status: 'available'
    })
  }

  
}
