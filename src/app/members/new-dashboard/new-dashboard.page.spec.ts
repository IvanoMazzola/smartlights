import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDashboardPage } from './new-dashboard.page';

describe('NewDashboardPage', () => {
  let component: NewDashboardPage;
  let fixture: ComponentFixture<NewDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
