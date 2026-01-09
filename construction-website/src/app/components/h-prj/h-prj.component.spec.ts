import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HPrjComponent } from './h-prj.component';

describe('HPrjComponent', () => {
  let component: HPrjComponent;
  let fixture: ComponentFixture<HPrjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HPrjComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HPrjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
