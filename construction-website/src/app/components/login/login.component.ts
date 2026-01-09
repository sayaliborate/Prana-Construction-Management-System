import { Component } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 username = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
  this.loginService.login(this.username, this.password).subscribe({
    next: (res: any) => {
      if (!res.access) {
        alert('Login failed: No token returned');
        return;
      }

      // Save token
      localStorage.setItem('token', res.access);

      // Hardcode role for testing
      let role = 'user';
      if (this.username === 'sayali') role = 'admin'; // <-- your test admin
      else if (this.username === 'nishant') role = 'supervisor';
      this.authService.setRole(role);

      // Redirect
      if (role === 'admin') this.router.navigate(['/admin-dashboard']);
      else if (role === 'supervisor') this.router.navigate(['/super']);
      else this.router.navigate(['/client-dashboard']);
    },
    error: (err) => {
      console.error(err);
      alert('Login failed. Please check username/password.');
    }
  });
}

}