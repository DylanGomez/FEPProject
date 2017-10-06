import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareUitlenenFormComponent } from './hardware-uitlenen-form.component';

describe('HardwareUitlenenFormComponent', () => {
  let component: HardwareUitlenenFormComponent;
  let fixture: ComponentFixture<HardwareUitlenenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareUitlenenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareUitlenenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
