import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E003Component } from './e003.component';

describe('E003Component', () => {
  let component: E003Component;
  let fixture: ComponentFixture<E003Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E003Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
