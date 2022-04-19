import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E004Component } from './e004.component';

describe('E004Component', () => {
  let component: E004Component;
  let fixture: ComponentFixture<E004Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E004Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
