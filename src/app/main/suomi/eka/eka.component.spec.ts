import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkaComponent } from './eka.component';

describe('EkaComponent', () => {
  let component: EkaComponent;
  let fixture: ComponentFixture<EkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
