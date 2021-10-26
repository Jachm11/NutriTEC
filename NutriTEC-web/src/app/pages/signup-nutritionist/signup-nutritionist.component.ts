import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-nutritionist',
  templateUrl: './signup-nutritionist.component.html',
  styleUrls: ['./signup-nutritionist.component.css']
})
export class SignupNutritionistComponent implements OnInit {

  url:string

  constructor(private router:Router) {

    this.url = router.url;


   }

  ngOnInit(): void {
  }

}
