import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerLicenseComponent } from './server-license.component';

describe('ServerLicenseComponent', () => {
  let component: ServerLicenseComponent;
  let fixture: ComponentFixture<ServerLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
