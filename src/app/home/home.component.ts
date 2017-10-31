import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public isLoggedIn(): boolean {
    // Create a function that checks if the user is logged in or not.
    // Later, once authorisation is implemented, delete this function and create the same function in the autorisation service.
    return true;
  }

  ngOnInit() {
  }

}
