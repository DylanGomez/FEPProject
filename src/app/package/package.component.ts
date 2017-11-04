import { ViewChild, Component, OnInit } from '@angular/core';
import { ModalService } from '../_services/index';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  moduleId: module.id.toString()

})

export class PackageComponent implements OnInit {
    private bodyText: string;

    constructor(private modalService: ModalService) {
    }

    ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }
}
