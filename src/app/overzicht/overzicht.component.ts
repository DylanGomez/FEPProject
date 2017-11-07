import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data/form-data.service';
import { HardwareUitlenenFormComponent } from '../hardware-uitlenen-form/hardware-uitlenen-form.component';

@Component({
  providers: [FormDataService],
  selector: 'app-overzicht',
  templateUrl: './overzicht.component.html',
  styleUrls: ['./overzicht.component.scss']
})
export class OverzichtComponent implements OnInit {

  private allHardwareList = this.formDataService.allHardwareList;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
  }

}
