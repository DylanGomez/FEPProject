import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { NavController, AlertController } from 'ionic-angular';


export interface HardwareItemInterface {
  id: number;
  name: string;
  status: string;
  package: string;
  hardwareID?: string;
}

export interface LendingsInterface {
  date: string;
  hardwareId: number;
  studentName: string;
  studentNumber: string;
}

@Injectable()
export class FormDataService {
  // If true, it will show a reset button in the 'hardware-uitlenen-form' page
  public testingMode = true;

  // Firestore collection
  private hardwareItemsDB: AngularFirestoreCollection<HardwareItemInterface>;

  // Firestore observable that contains our items and is capable of itteration
  public hardwareItems: Observable<HardwareItemInterface[]>;

  // Custom list containing custom data which can be used in a front end table
  public hardwareList: { name: string; id: number; selected: boolean; hardwareID: string; package: string; }[] = [];
  public allHardwareList: { name: string; id: number; selected: boolean; hardwareID: string; package: string; }[] = [];


  public setLent(hardwareID, id, studentnumber, studentname): void {
    // Update hardware list, set status to not available (hardwareID is the document key)
    this.hardwareItemsDB.doc(hardwareID).update({ status: 'not available' });

    // Adding document to lendings
    this.db.collection('lendings').add({
      hardwareId: id,
      studentNumber: studentnumber,
      studentName: studentname,
      date: new Date(new Date().getTime()).toLocaleString()
    });
  }

  public setDefect(hardwareID): void {
    this.hardwareItemsDB.doc(hardwareID).update({ status: 'Broken' });
  }

  public resetAvailability(): void {
    // This will reset ALL hardware items status and set it back to available.
    // This function can only be called if testingMode is on(due to button invisable)
    // Delete when this goes live
    this.db.collection('hardware', ref => ref.orderBy('id').where('status', '==', 'not available'))
      .snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as HardwareItemInterface;
          const hardwareID = action.payload.doc.id;
          return { hardwareID, ...data };
        });
      })
      .forEach(element => {
        element.forEach(item => {
          this.hardwareItemsDB.doc(item.hardwareID).update({ status: 'available' });
        });
      });

  }

  // Loads data from the database in the form
  loadData(hardwareList) {
    this.hardwareItems.forEach(function (hardwareItem) {
      hardwareItem.forEach(function (item) {
        // Adds hardware item to the list that keeps record of all the hardware items
        hardwareList.push({ 'name': item.name, 'id': item.id, 'selected': false, 'hardwareID': item.hardwareID, 'status': item.status
        , 'package': item.package });
    });
    });
  }


  makePackages(packageName, packageID) {
    this.db.collection('hardware').add({ id: packageID, name: packageName, status: 'available', package: 'true' });
  }

  setStatusForPackage(hardwareID) {
    this.hardwareItemsDB.doc(hardwareID).update({ status: 'not available' });
  }


  constructor(public db: AngularFirestore) {
    // Get all records from collection 'hardware', order them by id, and only select where avaible if true
    this.hardwareItemsDB = db.collection('hardware', ref => ref.orderBy('id').where('status', '==', 'available'));

    // Saves it to a readable list + adds the unique identifier to the list, so we can easily change values later
    this.hardwareItems = this.hardwareItemsDB.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as HardwareItemInterface;
        const hardwareID = action.payload.doc.id;
        return { hardwareID, ...data };
      });
    });
    this.loadData(this.hardwareList);

    // To load all data
    this.hardwareItemsDB = db.collection('hardware', ref => ref.orderBy('id'));

    this.hardwareItems = this.hardwareItemsDB.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as HardwareItemInterface;
        const hardwareID = action.payload.doc.id;
        return { hardwareID, ...data };
      });
    });
    this.loadData(this.allHardwareList);

  }


  // Toevoegen van ID en Naam, plus static status en package aan de collection hardware in FireStore
  public Toevoegen(merknaam,type,categorie,beschrijving,aankoopprijs,aantal): void {
    this.db.collection('hardware').add({
      merknaam: merknaam,
      type: type,
      categorie:categorie,
      beschrijving: beschrijving,
      aankoopprijs:aankoopprijs,
      aantal: aantal,
      status: 'available',
      package: 'false',
      datum: new Date().toLocaleString("hc")
    });
  }
}
