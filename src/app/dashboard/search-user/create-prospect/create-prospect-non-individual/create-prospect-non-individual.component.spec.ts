/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateProspectNonIndivdualComponent } from './create-prospect-non-individual.component';

describe('ProductAddNewComponent', () => {
  let component: CreateProspectNonIndivdualComponent;
  let fixture: ComponentFixture<CreateProspectNonIndivdualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProspectNonIndivdualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProspectNonIndivdualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
