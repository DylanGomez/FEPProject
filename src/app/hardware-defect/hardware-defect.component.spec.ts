import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareDefectComponent } from './hardware-defect.component';

describe('HardwareDefectComponent', () => {
  let component: HardwareDefectComponent;
  let fixture: ComponentFixture<HardwareDefectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareDefectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareDefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
