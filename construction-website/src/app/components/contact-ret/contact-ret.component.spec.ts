import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRetComponent } from './contact-ret.component';

describe('ContactRetComponent', () => {
  let component: ContactRetComponent;
  let fixture: ComponentFixture<ContactRetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactRetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactRetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
