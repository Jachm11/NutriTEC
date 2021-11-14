import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login-nutritionist',
  templateUrl: './login-nutritionist.component.html',
  styleUrls: ['./login-nutritionist.component.css']
})

/**
 * Pagina que muestea el login del nutricionista
 */
export class LoginNutritionistComponent implements OnInit {

  email:string;
  password:string;


  constructor(private apiService:ApiService, private global:GlobalService, private router:Router) { }

  ngOnInit(): void {
  }




  /**
   * Funcion que se ejecuta cuando se desea realizar el login. Recoge la informacion de ingresada 
   * por el usuario y realiza el llamado al API
   */
  login(){

    this.apiService.loginNutritionist(this.email, this.password).subscribe((current_nutrionist)=>{
      this.global.transactionSuccess("Ingresó correctamente");
      this.global.current_nutritionist = current_nutrionist;
      console.log(this.global.current_nutritionist);
      this.router.navigateByUrl("/home-nutritionist");//Aqui va el perfil


  }, (error)=> {
  
      this.global.transactionFailed("Datos inválidos, ingrese nuevamente su usuario");
  });

  }

}
