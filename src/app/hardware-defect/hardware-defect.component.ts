import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data/form-data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  providers: [FormDataService],
  selector: 'app-hardware-defect',
  templateUrl: './hardware-defect.component.html',
  styleUrls: ['./hardware-defect.component.css']
})
export class HardwareDefectComponent implements OnInit {
  private hardwareList = this.formDataService.hardwareList;

  hasSomethingSelected(): boolean {
    return this.formDataService.hardwareList.some(function (a) { return a.selected; });
  }

  saveStatus(): void {
    this.hardwareList.filter(x => x.selected === true).forEach(element => {
      this.formDataService.setDefect(element.hardwareID);
    });
    this.router.navigate(['/HomePage']);
  }

  private selectHardware(hardwareid: string) {
    // Filter through array list and only selecting the element from which the id is the same as the given id
    const element = this.hardwareList.filter(x => x.hardwareID === hardwareid)[0];
    element.selected = !element.selected;
    // Change button color & text
    $('tr[hardwareid=' + hardwareid + '] button').toggleClass('btn-secondairy btn-success')
    .text(element.selected ? 'Geselecteerd!' : 'Selecteer!');
  }

  constructor(private formDataService: FormDataService,
    private router: Router, private titleService: Title
  ) { }
  ngOnInit() {
    this.titleService.setTitle('Defect melden');

  }

}
