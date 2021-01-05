import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionChecklistComponent } from './production-checklist.component';

describe('ProductionChecklistComponent', () => {
  let component: ProductionChecklistComponent;
  let fixture: ComponentFixture<ProductionChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
