// Made by Guus
import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
export interface ToevoegenInterface {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class FormDataService {

  public db = firebase.firestore();
  
  // If true, it will show a reset button in the 'hardware-uitlenen-form' page
  public testingMode = true;

  // Firestore collection
  private hardwareItemsDB: AngularFirestoreCollection<ToevoegenInterface>;

  // Firestore observable that contains our items and is capable of itteration
  public hardwareItems: Observable<ToevoegenInterface[]>;

  public Toevoegen(id, name): void {
    this.db.collection('hardware').add({
      id: id,
      name: name,
      status: 'available'
    })
  }

  
}
