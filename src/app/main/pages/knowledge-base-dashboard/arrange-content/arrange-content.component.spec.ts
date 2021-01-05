import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangeContentComponent } from './arrange-content.component';

describe('ArrangeContentComponent', () => {
  let component: ArrangeContentComponent;
  let fixture: ComponentFixture<ArrangeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrangeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
