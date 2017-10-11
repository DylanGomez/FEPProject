import { Component, OnInit } from '@angular/core';
import { toevoegenDTO } from './toevoegen.dto';

@Component({
  selector: 'app-toevoegen',
  templateUrl: './toevoegen.component.html',
  styleUrls: ['./toevoegen.component.css']
})
export class ToevoegenComponent implements OnInit {
  toevoegen: toevoegenDTO;
  constructor() {   }

  ngOnInit() {
  }

}
