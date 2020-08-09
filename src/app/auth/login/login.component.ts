import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isLoading: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onLogin(f: NgForm) {
    this.authService.onLogin(f.value.email,
      f.value.password);
  }

}
