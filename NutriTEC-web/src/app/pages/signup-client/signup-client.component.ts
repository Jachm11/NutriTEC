import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.css']
})

/**
 * Pagina que muestra el registro de los clientes
 */
export class SignupClientComponent implements OnInit {

  url:string;

  constructor(private router:Router) {

    this.url = this.router.url;
    console.log(this.url);

   }

  ngOnInit(): void {
  }

}
