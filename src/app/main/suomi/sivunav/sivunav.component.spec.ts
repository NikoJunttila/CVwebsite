import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SivunavComponent } from './sivunav.component';

describe('SivunavComponent', () => {
  let component: SivunavComponent;
  let fixture: ComponentFixture<SivunavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SivunavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SivunavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
