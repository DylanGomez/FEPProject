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
  merknaam = "";
  type = "";
  categorie = "";
  beschrijving = "";
  aankoopprijs = null;
  aantal = null;
  categorieen: string[] = ["Overig", "Randapparatuur", "Laptop", "Datakabel", "Singleboardcomputer", "Module"]
  AankoopprijsError = false;
  AantalError1 = false;
  AantalError2 = false;
  

  //toevoegen nieuwe hardware
  public toevoegen(): void {
    // ID en name ophalen uit het input veld
    let merknaam = (<HTMLInputElement>document.getElementById('merknaam')).value;
    let type = (<HTMLInputElement>document.getElementById('type')).value;
    let categorie = (<HTMLInputElement>document.getElementById('categorie')).value;
    let beschrijving = (<HTMLInputElement>document.getElementById('beschrijving')).value;
    let aankoopprijs = parseFloat((<HTMLInputElement>document.getElementById('aankoopprijs')).value);
    let aantal = parseFloat((<HTMLInputElement>document.getElementById('aantal')).value);

    // Gebruik FormDataService om de gegevens toe te voegen aan FireStore
    this.formDataService.Toevoegen(merknaam,type,categorie,beschrijving,aankoopprijs,aantal);
    // Reset ID en name
    this.merknaam = "";
    this.type = "";
    this.categorie = "";
    this.beschrijving = "";
    this.aankoopprijs = null;
    this.aantal = null;
    alert("De nieuwe hardware is succesvol toegevoegd!");

  }
  // haalt de formdataservice op
  constructor(private formDataService: FormDataService,
    private modalService: ModalService,
    private router: Router, private titleService: Title
  ) { }
  ngOnInit() {
    this.titleService.setTitle('Toevoegen');
  }
  openModal(id: string) {
    this.AankoopprijsError=false;
    this.AantalError1 = false;
    this.AantalError2 = false;
    if (this.aankoopprijs < 0) {
      this.AankoopprijsError = true;
      console.log("fout1");
    }
    if (this.aantal <= 0) {
      this.AantalError1 = true;
      console.log("fout2");
    }
    if (this.aantal % 1 != 0) {
      this.AantalError2 = true;
      console.log("fout3");
    }
    if(!(this.aankoopprijs < 0) && !(this.aantal <= 0) && !(this.aantal % 1 != 0)) {
      
      // opent het modal venster
      this.modalService.open(id);
      // haalt de ingevoerde gegevens op en vraagt of het correct is
      document.getElementById('merknaamout').innerHTML = this.merknaam;
      document.getElementById('typeout').innerHTML = this.type;
      document.getElementById('categorieout').innerHTML = this.categorie;
      document.getElementById('beschrijvingout').innerHTML = this.beschrijving;
      document.getElementById('aankoopprijsout').innerHTML = this.aankoopprijs.toString();
      document.getElementById('aantalout').innerHTML = this.aantal.toString();
    }
  }
  // sluit het modal venster af
  closeModal(id: string) {
    this.modalService.close(id);
  }


}
