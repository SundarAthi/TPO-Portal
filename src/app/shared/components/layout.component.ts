import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'loglayoutin',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  currentYear: number;

  constructor(private router: Router) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() { }

  goToLogin() {
    this.router.navigate(['/signin']);
  }

}

