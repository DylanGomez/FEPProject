import { Component, OnInit, NgModule } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore  } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-hardware-uitlenen-form',
  templateUrl: './hardware-uitlenen-form.component.html',
  styleUrls: ['./hardware-uitlenen-form.component.css']
})
export class HardwareUitlenenFormComponent implements OnInit {

  studentnameModel = '';
  studentnumberModel = '';

  hardwareItems: Observable<any>;
  private hardwareList: {name: string; id: number; selected: boolean}[] = [];

  // Check that returns boolean wether the user selected hardware
  hasSomethingSelected(): boolean {
    let foundHardware = false;
    this.hardwareList.forEach(element => {
      if (element.selected === true) { foundHardware = true; }
    });
    return foundHardware;
  }

  // This function is called when a user selects hardware. It will check if it is selected or not and changes values
  private selectHardware(id: number) {
    this.hardwareList.forEach(element => {
      if (element.id === id) {
        // Change button color
        $('tr[hardwareid=' + id + '] button').toggleClass('btn-secondairy btn-success');
        element.selected = !element.selected;
        // Change button text
        if (element.selected) {
          $('tr[hardwareid=' + id + '] button').text('Geselecteerd!');
        } else {
          $('tr[hardwareid=' + id + '] button').text('Selecteer!');
        }
      }
    });

  }

  // Constructor. Constructs things.
  constructor(public db: AngularFirestore) {
    this.hardwareItems = db.collection('hardware').valueChanges(); // Get all records from document 'hardware'
    this.loadData(this.hardwareList);
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

  ngOnInit() {}

}
