import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAssignAgentComponent } from './ticket-assign-agent.component';

describe('TicketAssignAgentComponent', () => {
  let component: TicketAssignAgentComponent;
  let fixture: ComponentFixture<TicketAssignAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketAssignAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAssignAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
