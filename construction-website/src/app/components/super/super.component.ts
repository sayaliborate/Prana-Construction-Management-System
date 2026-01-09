import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-super',
  imports: [RouterModule],
  templateUrl: './super.component.html',
  styleUrl: './super.component.css'
})
export class SuperComponent {
username = '';

  constructor(private authService: AuthService, private router: Router) {
    // Optional: get username from token or localStorage
    this.username = 'Supervisor'; // you can customize this
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.setRole(''); // clear role
    this.router.navigate(['/login']);
  }
}
