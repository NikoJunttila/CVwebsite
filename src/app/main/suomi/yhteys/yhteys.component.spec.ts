import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YhteysComponent } from './yhteys.component';

describe('YhteysComponent', () => {
  let component: YhteysComponent;
  let fixture: ComponentFixture<YhteysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YhteysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YhteysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
