import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  currentYear: number;

  constructor(private router: Router) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() { }

  goToMyLoan() {
    this.router.navigate(['/my-loan']);
  }

  goToWebsite() {
    window.open("https://www.brimmatech.com", "_blank");
  }

}
