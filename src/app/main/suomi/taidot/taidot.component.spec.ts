import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaidotComponent } from './taidot.component';

describe('TaidotComponent', () => {
  let component: TaidotComponent;
  let fixture: ComponentFixture<TaidotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaidotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaidotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
