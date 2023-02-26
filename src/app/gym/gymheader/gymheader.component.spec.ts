import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymheaderComponent } from './gymheader.component';

describe('GymheaderComponent', () => {
  let component: GymheaderComponent;
  let fixture: ComponentFixture<GymheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
