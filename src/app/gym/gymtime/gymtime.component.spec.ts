import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymtimeComponent } from './gymtime.component';

describe('GymtimeComponent', () => {
  let component: GymtimeComponent;
  let fixture: ComponentFixture<GymtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymtimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
