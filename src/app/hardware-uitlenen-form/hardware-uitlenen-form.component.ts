import { Component, OnInit, NgModule } from '@angular/core';
import { FormDataService } from '../form-data.service';

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

  hardwareItems: Observable<any[]> = this.formDataService.hardwareItems;
  private hardwareList: {name: string; id: number; selected: boolean; hardwareID: string}[] = this.formDataService.hardwareList;

  hasSomethingSelected(): boolean {
    return this.formDataService.hasSomethingSelected();
  }

  saveStatus(): void {
    // Go through the hardware list, check if selected is true.
    // Ifso, sent information to formDataService to handle the database coonection etc.
    this.hardwareList.forEach(element => {
      if (element.selected === true) {
        this.formDataService.setLent(element.hardwareID, this.studentnumberModel);
      }
    });
  }

  reset(): void {
    // Temporary for testing!!
    this.formDataService.resetAvailability();
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
