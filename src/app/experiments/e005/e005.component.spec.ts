import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E005Component } from './e005.component';

describe('E005Component', () => {
  let component: E005Component;
  let fixture: ComponentFixture<E005Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E005Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
