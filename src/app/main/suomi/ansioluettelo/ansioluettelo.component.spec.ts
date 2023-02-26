import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsioluetteloComponent } from './ansioluettelo.component';

describe('AnsioluetteloComponent', () => {
  let component: AnsioluetteloComponent;
  let fixture: ComponentFixture<AnsioluetteloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsioluetteloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsioluetteloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
