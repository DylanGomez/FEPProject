import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data/form-data.service';
import { HardwareUitlenenFormComponent } from '../hardware-uitlenen-form/hardware-uitlenen-form.component';

@Component({
  selector: 'app-overzicht',
  templateUrl: './overzicht.component.html',
  styleUrls: ['./overzicht.component.css']
})
export class OverzichtComponent implements OnInit {

  private hardwareList = this.formDataService.hardwareList;

  constructor(private formDataService: FormDataService, private hardwareUitlenen: HardwareUitlenenFormComponent) { }

  ngOnInit() {
  }

  private selectHardware(hardwareid: string) {
        this.hardwareUitlenen.selectHardware(hardwareid);
        this.hardwareList.filter(x => x.selected === true).forEach(element => {
            this.formDataService.setStatusForPackage(element.hardwareID);
        });
    }


}
