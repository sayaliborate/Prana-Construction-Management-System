import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../service/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SiteService } from '../../../service/site.service';
import { AddClientService } from '../../../service/add-client.service';
interface Site {
  id: number;
  title: string;
  region: string;
  category: string;
  description: string;
  team_leader: number;
  created_at: string;
  team_leader_name?: string; // optional, will be added dynamically
}
interface TeamLeader {
  id: number;
  name: string;
}
@Component({
  selector: 'app-project',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  sites: Site[] = [];
  clients: any[] = [];
  errorMsg = '';

  newProject: any = {
    site: '',
    client: '',
    name: '',
    slug: '',
    start_date: '',
    estimated_completion: '',
    budget: '',
    progress: '',
    status: 'pending',
    description: '',
    featured: false
  };

  constructor(
    private projectService: ProjectService,
    private siteService: SiteService,
    private clientService: AddClientService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadSites();
    this.loadProjects();
  }

  // Load all projects
  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data.map((project: any) => ({
          ...project,
          site_title: this.sites.find(s => s.id === project.site)?.title || 'N/A',
          client_name: this.clients.find(c => c.id === project.client)?.name || 'N/A'
        }));
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.errorMsg = 'Failed to load projects.';
      }
    });
  }

  // Load all clients
  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error loading clients', err)
    });
  }

  // Load all sites
  loadSites(): void {
    this.siteService.getSites().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error('Error loading sites', err)
    });
  }

  // Add new project
  addProject(): void {
    if (!this.newProject.name || !this.newProject.site || !this.newProject.client) {
      alert('Please fill required fields');
      return;
    }

    this.projectService.addProject(this.newProject).subscribe({
      next: () => {
        alert('Project added successfully!');
        this.newProject = {};
        this.loadProjects();
      },
      error: (err) => {
        console.error('Error adding project:', err);
        alert('Failed to add project');
      }
    });
  }
}