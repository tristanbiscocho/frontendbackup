import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBotsComponent } from './add-bots.component';

describe('AddBotsComponent', () => {
  let component: AddBotsComponent;
  let fixture: ComponentFixture<AddBotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
