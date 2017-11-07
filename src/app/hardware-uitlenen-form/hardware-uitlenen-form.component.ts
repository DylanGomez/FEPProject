import { Component, OnInit, NgModule } from '@angular/core';
import { FormDataService } from '../form-data/form-data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  providers: [FormDataService],
  selector: 'app-hardware-uitlenen-form',
  templateUrl: './hardware-uitlenen-form.component.html',
  styleUrls: ['./hardware-uitlenen-form.component.css']
})

export class HardwareUitlenenFormComponent implements OnInit {

  // Models for the inputs
  studentnameModel = '';
  studentnumberModel = '';

  // For testing purposes
  testingMode: boolean = this.formDataService.testingMode;

  // Hardware list containing all hardware items, including the selected status
  private hardwareList = this.formDataService.hardwareList;

  // Used in a front end check. Will return true if the user has an item selected
  hasSomethingSelected(): boolean {
    return this.formDataService.hardwareList.some(function (a) { return a.selected; });
  }

  // We need to reload the tablet or something after this.
  // Angular is bugged and will add random items to the table
  saveStatus(): void {
    // Filter list, sent information to formDataService to handle the database conection etc.
    this.hardwareList.filter(x => x.selected === true).forEach(element => {
      this.formDataService.setLent(element.hardwareID, element.id, this.studentnumberModel, this.studentnameModel);
    });
    // Return to the homepage
    this.router.navigate(['/HomePage']);
  }

  reset(): void {
    // Temporary for testing!!
    // This will NOT RESET the lendings table!!!
    this.formDataService.resetAvailability();
  }

  // This function is called when a user selects hardware. It will check if it is selected or not and changes values
  selectHardware(hardwareid: string) {
    // Filter through array list and only selecting the element from which the id is the same as the given id
    const element = this.hardwareList.filter(x => x.hardwareID === hardwareid)[0];
    element.selected = !element.selected;
    // Change button color & text
    $('tr[hardwareid=' + hardwareid + '] button').toggleClass('btn-secondairy btn-success').text(element.selected ? 'Geselecteerd!' : 'Selecteer!');
  }

  // Constructor. Constructs things.
  constructor(private formDataService: FormDataService,
    private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Hardware uitlenen");
  }

}
