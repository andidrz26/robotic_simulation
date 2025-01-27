import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateSystemThreeDimComponent } from './coordinate-system-three-dim.component';

describe('CoordinateSystemThreeDimComponent', () => {
  let component: CoordinateSystemThreeDimComponent;
  let fixture: ComponentFixture<CoordinateSystemThreeDimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateSystemThreeDimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinateSystemThreeDimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
