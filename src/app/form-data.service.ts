import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore  } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FormDataService {

  hardwareItems: Observable<any>;
  public hardwareList: {name: string; id: number; selected: boolean}[] = [];

  // Check that returns boolean wether the user selected hardware
  hasSomethingSelected(): boolean {
    let foundHardware = false;
    this.hardwareList.forEach(element => {
      // I am unable to just call return true???(wont return anything)
      if (element.selected === true) { foundHardware = true; }
    });
    return foundHardware;
  }

  // Loads data from the database in the form
  loadData(hardwareList) {
    // I really dont know why I need to itterate twice though this object, but hee.... It works!
    this.hardwareItems.forEach(function(hardwareItems) {
      hardwareItems.sort((a, b) => a.name.localeCompare(b.name)); // Sort hardware by name
      hardwareItems.forEach(function(hardwareItem) {
        if ( hardwareItem.status === 'available' ) {
          // Adds hardware item to the list that keeps record of all the hardware items
          hardwareList.push({'name': hardwareItem.name, 'id': hardwareItem.id, 'selected': false});
        }
      });
    });
  }

  constructor(public db: AngularFirestore) {
    this.hardwareItems = db.collection('hardware').valueChanges(); // Get all records from collection 'hardware'
    this.loadData(this.hardwareList);
  }
}
