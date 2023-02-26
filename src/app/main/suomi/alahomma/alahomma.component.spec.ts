import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlahommaComponent } from './alahomma.component';

describe('AlahommaComponent', () => {
  let component: AlahommaComponent;
  let fixture: ComponentFixture<AlahommaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlahommaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlahommaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
