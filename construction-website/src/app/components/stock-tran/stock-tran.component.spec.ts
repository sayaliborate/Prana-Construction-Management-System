import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTranComponent } from './stock-tran.component';

describe('StockTranComponent', () => {
  let component: StockTranComponent;
  let fixture: ComponentFixture<StockTranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTranComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockTranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
