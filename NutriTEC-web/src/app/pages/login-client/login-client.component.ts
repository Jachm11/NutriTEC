import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  email:string;
  password:string;



  constructor() { }

  ngOnInit(): void {
  }



  login(){

    
  }

}
