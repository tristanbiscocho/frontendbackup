import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterReadingForReasonComponent } from './meter-reading-for-reason.component';

describe('MeterReadingForReasonComponent', () => {
  let component: MeterReadingForReasonComponent;
  let fixture: ComponentFixture<MeterReadingForReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterReadingForReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterReadingForReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
