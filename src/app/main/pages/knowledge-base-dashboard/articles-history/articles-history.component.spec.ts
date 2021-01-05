import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesHistoryComponent } from './articles-history.component';

describe('ArticlesHistoryComponent', () => {
  let component: ArticlesHistoryComponent;
  let fixture: ComponentFixture<ArticlesHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
