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
  
  toevoegen(name: string, id: number): void{
    this.formDataService.Aanmaken(id, name);
  }
  constructor(private formDataService: FormDataService) {   }

  ngOnInit() {
  }

}
