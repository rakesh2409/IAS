/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UseridTabComponent } from './userid-tab.component';

describe('UseridTabComponent', () => {
  let component: UseridTabComponent;
  let fixture: ComponentFixture<UseridTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseridTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseridTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
