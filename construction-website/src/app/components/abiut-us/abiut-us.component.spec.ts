import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbiutUsComponent } from './abiut-us.component';

describe('AbiutUsComponent', () => {
  let component: AbiutUsComponent;
  let fixture: ComponentFixture<AbiutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbiutUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbiutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
