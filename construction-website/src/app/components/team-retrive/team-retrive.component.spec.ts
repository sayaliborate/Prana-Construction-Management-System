import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRetriveComponent } from './team-retrive.component';

describe('TeamRetriveComponent', () => {
  let component: TeamRetriveComponent;
  let fixture: ComponentFixture<TeamRetriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRetriveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamRetriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
