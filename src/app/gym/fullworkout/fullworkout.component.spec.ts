import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullworkoutComponent } from './fullworkout.component';

describe('FullworkoutComponent', () => {
  let component: FullworkoutComponent;
  let fixture: ComponentFixture<FullworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullworkoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
