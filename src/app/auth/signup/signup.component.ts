import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Role } from '../auth.model';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  isLoading: boolean;
  roles: string[];
role: Role;
  constructor(private authService: AuthService, private router: Router) { }


  selectedRole: string;
  ngOnInit(): void {

    this.roles = [Role.Master, Role.Admin, Role.Customer];
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
