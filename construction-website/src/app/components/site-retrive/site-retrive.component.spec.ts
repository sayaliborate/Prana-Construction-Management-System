import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRetriveComponent } from './site-retrive.component';

describe('SiteRetriveComponent', () => {
  let component: SiteRetriveComponent;
  let fixture: ComponentFixture<SiteRetriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteRetriveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteRetriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
