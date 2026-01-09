import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryRetriveComponent } from './salary-retrive.component';

describe('SalaryRetriveComponent', () => {
  let component: SalaryRetriveComponent;
  let fixture: ComponentFixture<SalaryRetriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryRetriveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryRetriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
