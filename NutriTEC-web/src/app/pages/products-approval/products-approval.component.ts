import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-approval',
  templateUrl: './products-approval.component.html',
  styleUrls: ['./products-approval.component.css']
})
export class ProductsApprovalComponent implements OnInit {

  url:string;

  constructor(private router:Router) { 

    this.url = "/register-client";
  }

  ngOnInit(): void {
  }

}
