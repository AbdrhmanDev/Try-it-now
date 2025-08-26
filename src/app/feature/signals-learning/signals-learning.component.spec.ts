import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsLearningComponent } from './signals-learning.component';

describe('SignalsLearningComponent', () => {
  let component: SignalsLearningComponent;
  let fixture: ComponentFixture<SignalsLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsLearningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
