import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-nutritionist',
  templateUrl: './login-nutritionist.component.html',
  styleUrls: ['./login-nutritionist.component.css']
})
export class LoginNutritionistComponent implements OnInit {

  email:string;
  password:string;


  constructor() { }

  ngOnInit(): void {
  }




  login(){

    console.log(this.email);



  }

}
