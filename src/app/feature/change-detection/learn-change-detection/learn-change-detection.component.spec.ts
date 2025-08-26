import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnChangeDetectionComponent } from './learn-change-detection.component';

describe('LearnChangeDetectionComponent', () => {
  let component: LearnChangeDetectionComponent;
  let fixture: ComponentFixture<LearnChangeDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnChangeDetectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnChangeDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
