import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBaseDashboardComponent } from './knowledge-base-dashboard.component';

describe('KnowledgeBaseDashboardComponent', () => {
  let component: KnowledgeBaseDashboardComponent;
  let fixture: ComponentFixture<KnowledgeBaseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeBaseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeBaseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
