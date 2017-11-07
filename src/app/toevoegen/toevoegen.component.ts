import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data/form-data.service';
import { Observable } from 'rxjs/Observable';
import { ModalService } from '../_services/index';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  providers: [FormDataService],
  selector: 'app-toevoegen',
  templateUrl: './toevoegen.component.html',
  styleUrls: ['./toevoegen.component.scss']
})

export class ToevoegenComponent implements OnInit {

  testingMode: boolean = this.formDataService.testingMode;
  ID = "";
  name = "";

  //toevoegen nieuwe hardware
  public toevoegen(): void {
    //ID en name ophalen uit het input veld
    var ID = parseFloat((<HTMLInputElement>document.getElementById("ID")).value);
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    //Gebruik FormDataService om de gegevens toe te voegen aan FireStore
    this.formDataService.Toevoegen(ID, name);
    //Reset ID en name
    this.ID = "";
    this.name = "";

  }
  //haalt de formdataservice op
  constructor(private formDataService: FormDataService,
    private modalService: ModalService,
    private router: Router, private titleService: Title
  ) { }
  ngOnInit() {
    this.titleService.setTitle("Toevoegen");
  }
  openModal(id: string) {
    //opent het modal venster
    this.modalService.open(id);
    //haalt de ingevoerde gegevens op en vraagt of het correct is
    document.getElementById("IDout").innerHTML = this.ID;
    document.getElementById("nameout").innerHTML = this.name;

  }
  //sluit het modal venster af
  closeModal(id: string) {
    this.modalService.close(id);
  }


}
