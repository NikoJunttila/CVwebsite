import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedGymTimeComponent } from './planned-gym-time.component';

describe('PlannedGymTimeComponent', () => {
  let component: PlannedGymTimeComponent;
  let fixture: ComponentFixture<PlannedGymTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannedGymTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedGymTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
