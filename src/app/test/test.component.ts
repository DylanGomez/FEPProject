import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface HardwareItemInterface {
  id: number;
  name: string;
  status: string;
  hardwareID?: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  hardwareItemRef: AngularFirestoreCollection<HardwareItemInterface>;
  hardwareItem$: Observable<HardwareItemInterface[]>;

  constructor(private afs: AngularFirestore) {
    console.log('Test was called');
    this.hardwareItemRef = this.afs.collection<HardwareItemInterface>('hardware');
    this.hardwareItem$ = this.hardwareItemRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as HardwareItemInterface;
        const hardwareID = action.payload.doc.id;
        return { hardwareID, ...data };
      });
    });
  }

  buttonClick(): void {
    this.hardwareItem$.forEach(element => {
      element.forEach(innerElement => {
        if (+innerElement.id === 4) {
          innerElement.status = 'THIS WAS CHANGEDDDDD';
          this.updateTodo(innerElement);
        }
      });
    });
  }

  updateTodo(hardwareItem: HardwareItemInterface) {
    this.hardwareItemRef.doc(hardwareItem.hardwareID).update({ status: 'updated' });
  }

  ngOnInit() {
  }

}
