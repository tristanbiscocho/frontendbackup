import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketAdminComponent } from './add-ticket-admin.component';

describe('AddTicketAdminComponent', () => {
  let component: AddTicketAdminComponent;
  let fixture: ComponentFixture<AddTicketAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTicketAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
