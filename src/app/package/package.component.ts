import {Component, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  @ViewChild('myModal') myModal;

  constructor() { }

  ngOnInit() {
  }

  makePackage(){
    
  }


  openModel() {
    this.myModal.nativeElement.className = 'modal fade show';
  }
  closeModel() {
    this.myModal.nativeElement.className = 'modal hide';
  }

}
