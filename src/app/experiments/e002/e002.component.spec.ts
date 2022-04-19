import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E002Component } from './e002.component';

describe('E002Component', () => {
  let component: E002Component;
  let fixture: ComponentFixture<E002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E002Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
