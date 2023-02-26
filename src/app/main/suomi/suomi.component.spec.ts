import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuomiComponent } from './suomi.component';

describe('SuomiComponent', () => {
  let component: SuomiComponent;
  let fixture: ComponentFixture<SuomiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuomiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
