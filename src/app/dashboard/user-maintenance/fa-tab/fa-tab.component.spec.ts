/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FaTabComponent } from './fa-tab.component';

describe('FaTabComponent', () => {
  let component: FaTabComponent;
  let fixture: ComponentFixture<FaTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
