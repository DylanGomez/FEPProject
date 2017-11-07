import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data/form-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  providers: [FormDataService],
  selector: 'app-toevoegen',
  templateUrl: './toevoegen.component.html',
  styleUrls: ['./toevoegen.component.css']
})

export class ToevoegenComponent implements OnInit {
  testingMode: boolean = this.formDataService.testingMode;
  ID = "";
  name = "";

  public toevoegen(): void{
    var ID = parseFloat((<HTMLInputElement>document.getElementById("ID")).value);
    var name = (<HTMLInputElement>document.getElementById("name")).value;    
    this.formDataService.Toevoegen(ID, name);
    this.ID = "";
    this.name = "";
    
  }
  constructor(private formDataService: FormDataService) {   }

  ngOnInit() {
  }

}
