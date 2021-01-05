import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsAdminListComponent } from './tickets-admin-list.component';

describe('TicketsAdminListComponent', () => {
  let component: TicketsAdminListComponent;
  let fixture: ComponentFixture<TicketsAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
