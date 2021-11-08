import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  email:string;
  password:string;

  new_client:any;



  constructor(private global:GlobalService, private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
  }



  login(){

    this.apiService.loginClient(this.email, this.password).subscribe((current_client)=>{
        this.global.transactionSuccess("Ingresó correctamente");
        this.global.current_client = current_client;
        console.log(this.global.current_client);
<<<<<<< HEAD
        this.router.navigateByUrl("/measurement-register");
=======
        this.router.navigateByUrl("/home");//Aqui va el perfil
>>>>>>> fde2b6fda557f2769b2559863c03c27198346a82


    }, (error)=> {
    
        this.global.transactionFailed("Datos inválidos, ingrese nuevamente su usuario");
    });
  
  }

}
