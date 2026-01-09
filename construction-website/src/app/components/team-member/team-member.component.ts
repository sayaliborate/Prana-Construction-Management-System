import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamMemberService } from '../../../service/team-member.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-member',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.css'
})
export class TeamMemberComponent implements OnInit{
teamMemberForm!: FormGroup;
  selectedFile: File | null = null;
  message: string = '';
  clients: any[] = [];

  constructor(private fb: FormBuilder, private teamService: TeamMemberService) {
    this.teamMemberForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      bio: [''],
      email: ['', [Validators.email]],
      phone: [''],
      linkedin: [''],
      is_active: [true],
      order: [0],
    });
  }
ngOnInit(): void {
    this.loadClients();
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.teamMemberForm.invalid) {
      this.message = 'Please fill in the required fields.';
      return;
    }

    const formData = new FormData();
    Object.keys(this.teamMemberForm.value).forEach(key => {
      formData.append(key, this.teamMemberForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.teamService.createTeamMember(formData).subscribe({
      next: (res) => {
        this.message = 'Team member created successfully!';
        this.teamMemberForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.error(err);
        this.message = 'Error creating team member.';
      }
    });
  }

  loadClients(): void {
    this.teamService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }
}
