import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketsDashboardComponent } from './admin-tickets-dashboard.component';

describe('AdminTicketsDashboardComponent', () => {
  let component: AdminTicketsDashboardComponent;
  let fixture: ComponentFixture<AdminTicketsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTicketsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTicketsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
