import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E001Component } from './e001.component';

describe('E001Component', () => {
  let component: E001Component;
  let fixture: ComponentFixture<E001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
