import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullworkoutUseraddedComponent } from './fullworkout-useradded.component';

describe('FullworkoutUseraddedComponent', () => {
  let component: FullworkoutUseraddedComponent;
  let fixture: ComponentFixture<FullworkoutUseraddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullworkoutUseraddedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullworkoutUseraddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
