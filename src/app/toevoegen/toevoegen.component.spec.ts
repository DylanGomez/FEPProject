import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToevoegenComponent } from './toevoegen.component';

describe('ToevoegenComponent', () => {
  let component: ToevoegenComponent;
  let fixture: ComponentFixture<ToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToevoegenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
