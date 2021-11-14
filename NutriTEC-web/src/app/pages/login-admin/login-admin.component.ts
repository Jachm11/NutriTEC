import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
/**
 * Pagina que muestra el login para el administrador
 */
export class LoginAdminComponent implements OnInit {

  email: string;
  password: string;

  constructor(private global: GlobalService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }


  /**
   * Funcion que se ejecuta cuando se desea realizar el login. Recoge la informacion de ingresada 
   * por el usuario y realiza el llamado al API
   */
  login() {

    this.apiService.loginAdmin(this.email, this.password).subscribe((current_admin) => {
      this.global.transactionSuccess("Ingresó correctamente");
      this.global.current_admin = current_admin;
      this.router.navigateByUrl("/products-approval");

    }, (error) => {
      this.global.transactionFailed("Datos inválidos, ingrese nuevamente su usuario");
    });

  }

}
