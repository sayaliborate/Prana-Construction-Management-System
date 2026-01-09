import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../service/site.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamMemberService } from '../../../service/team-member.service';

@Component({
  selector: 'app-add-site',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-site.component.html',
  styleUrl: './add-site.component.css'
})
export class AddSiteComponent implements OnInit {
  siteForm!: FormGroup;
  teamLeaders: any[] = [];
  categories = ['residential', 'commercial', 'interior', 'renovation'];
  successMsg = '';
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private siteService: SiteService,
    private teamMemberService: TeamMemberService
  ) {}

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      title: ['', Validators.required],
      region: [''],
      category: ['residential', Validators.required],
      description: [''],
      team_leader: ['']
    });

    this.loadTeamLeaders();
  }

  loadTeamLeaders() {
    this.teamMemberService.getClients().subscribe({
      next: (data) => {
        this.teamLeaders = data;
        console.log("Team Leaders Retrieved:", data);
      },
      error: (err) => console.error('Error loading team leaders', err)
    });
  }

  onSubmit() {
    if (this.siteForm.invalid) return;

    this.siteService.addSite(this.siteForm.value).subscribe({
      next: (res) => {
        this.successMsg = '✅ Site added successfully!';
        this.errorMsg = '';
        this.siteForm.reset({ category: 'residential' });
      },
      error: (err) => {
        this.errorMsg = '❌ Failed to add site.';
        console.error(err);
      }
    });
  }
}