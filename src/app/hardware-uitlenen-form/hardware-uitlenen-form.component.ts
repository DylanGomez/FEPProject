import { Component, OnInit, NgModule } from '@angular/core';

import { FormDataService } from '../form-data.service';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  providers: [FormDataService],
  selector: 'app-hardware-uitlenen-form',
  templateUrl: './hardware-uitlenen-form.component.html',
  styleUrls: ['./hardware-uitlenen-form.component.css']
})

export class HardwareUitlenenFormComponent implements OnInit {

  studentnameModel = '';
  studentnumberModel = '';

  hardwareItems: Observable<any> = this.formDataService.hardwareItems;
  private hardwareList: {name: string; id: number; selected: boolean}[] = this.formDataService.hardwareList;

  hasSomethingSelected(): boolean {
    return this.formDataService.hasSomethingSelected();
  }

  // This function is called when a user selects hardware. It will check if it is selected or not and changes values
  private selectHardware(id: number) {
    this.formDataService.hardwareList.forEach(element => {
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
  constructor(private formDataService: FormDataService) { }

  ngOnInit() {}

}
