import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  isLoading: boolean;
  roles: string[];
  constructor(private authService: AuthService, private router: Router) { }


  selectedRole: string;
  ngOnInit(): void {
    this.roles = ['master', 'customer'];
    this.isLoading = false;

  }

  onSignup(f: NgForm) {
    this.authService.onSignup(
      f.value.name,
      f.value.email,
      f.value.password,
      this.selectedRole)
  }

  onCancel() {
    this.router.navigate(['']);

  }

}
