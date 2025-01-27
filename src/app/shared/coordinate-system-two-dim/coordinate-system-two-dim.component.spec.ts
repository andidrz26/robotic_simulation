import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateSystemTwoDimComponent } from './coordinate-system-two-dim.component';

describe('CoordinateSystemTwoDimComponent', () => {
  let component: CoordinateSystemTwoDimComponent;
  let fixture: ComponentFixture<CoordinateSystemTwoDimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateSystemTwoDimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinateSystemTwoDimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
