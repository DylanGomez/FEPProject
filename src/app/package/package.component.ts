import { ViewChild, Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from '../_services/index';
import { FormDataService } from '../form-data/form-data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HardwareUitlenenFormComponent } from '../hardware-uitlenen-form/hardware-uitlenen-form.component';


@Component({
  providers: [FormDataService, HardwareUitlenenFormComponent],
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  moduleId: module.id.toString()
})

export class PackageComponent implements OnInit {
    private bodyText: string;

    private hardwareList = this.formDataService.hardwareList;

    packageModel = '';
    packageIDModel = '';


    constructor(private modalService: ModalService,
    private formDataService: FormDataService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private hardwareUitlenen: HardwareUitlenenFormComponent) {
        this.toastr.setRootViewContainerRef(vcr);
    }

  // Used in a front end check. Will return true if the user has an item selected

    ngOnInit() {
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    makePackage() {
        this.hardwareList.filter(x => x.selected === true).forEach(element => {
      this.formDataService.setStatusForPackage(element.hardwareID);
    });
        this.formDataService.makePackages(this.packageModel, this.packageIDModel);
        this.toastr.success('Pakket met naam ' +  this.packageModel + ' is  succesvol toegevoegd!');
        this.closeModal('custom-modal-1');
    }

    private selectHardware(hardwareid: string) {
        this.hardwareUitlenen.selectHardware(hardwareid);
    }

  hasSomethingSelected() {
      this.hardwareUitlenen.hasSomethingSelected();
  }
}
