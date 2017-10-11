import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

export interface HardwareItemInterface {
  id: number;
  name: string;
  status: string;
  hardwareID?: string;
}

@Injectable()
export class FormDataService {

  public hardwareItemsDB: AngularFirestoreCollection<HardwareItemInterface>;
  hardwareItems: Observable<HardwareItemInterface[]>;

  public hardwareList: {name: string; id: number; selected: boolean; hardwareID: string;}[] = [];

  // Check that returns boolean wether the user selected hardware
  hasSomethingSelected(): boolean {
    let foundHardware = false;
    this.hardwareList.forEach(element => {
      // I am unable to just call return true???(wont return anything)
      if (element.selected === true) { foundHardware = true; }
    });
    return foundHardware;
  }

  public setLent(hardwareID, studentnumber): void {
    console.log('We got id: ' + hardwareID);
    console.log('Studentnumber: ' + studentnumber);
    console.log('--------------------------');

    // Update hardware list, set status to not available
    this.hardwareItemsDB.doc(hardwareID).update({ status: 'not available' });
  }

  public resetAvailability(): void {
    // Not working??
    console.log('Resetting available items');
    this.hardwareItems.forEach(function(hardwareItem) {
      console.log( 'Inner foreach 1' );
      hardwareItem.forEach(function(item) {
        console.log( 'Inner foreach 2' );
        this.hardwareItemsDB.doc(item.hardwareID).update({ status: 'available' });
      });
    });
  }

  // Loads data from the database in the form
  loadData(hardwareList) {
    // I really dont know why I need to itterate twice though this object, but hee.... It works!(first item is observerable)
    this.hardwareItems.forEach(function(hardwareItem) {
      hardwareItem.forEach(function(item) {
        // Adds hardware item to the list that keeps record of all the hardware items
        hardwareList.push({'name': item.name, 'id': item.id, 'selected': false, 'hardwareID': item.hardwareID});
      });
    });
  }

  constructor(public db: AngularFirestore) {
    // Get all records from collection 'hardware', order them by id, and only select where avaible if true
    this.hardwareItemsDB = db.collection('hardware', ref => ref.orderBy('id') .where('status', '==', 'available'));

    // Saves it to a readable list + adds the unique identifier to the list, so we can change values later
    this.hardwareItems = this.hardwareItemsDB.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as HardwareItemInterface;
        const hardwareID = action.payload.doc.id;
        return { hardwareID, ...data };
      });
    });
    this.loadData(this.hardwareList);
  }
}
