import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostpassComponent } from './lostpass.component';

describe('LostpassComponent', () => {
  let component: LostpassComponent;
  let fixture: ComponentFixture<LostpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostpassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
