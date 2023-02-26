import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokaComponent } from './toka.component';

describe('TokaComponent', () => {
  let component: TokaComponent;
  let fixture: ComponentFixture<TokaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
