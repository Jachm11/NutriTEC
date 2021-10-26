import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @Input() url:string;
    registerAs:string;
    registerAsClient:boolean;
    registerAsNutritionist:boolean;

    constructor() {}


    ngOnInit() {

      console.log(this.url);

      if (this.url == "/register-client"){

        console.log("entraaaa");
        this.registerAsClient = true; this.registerAsNutritionist = false;
        this.registerAs = "cliente";
      }

      else if (this.url == "/register-nutritionist")
      {
        this.registerAsClient = false; this.registerAsNutritionist = true;
        this.registerAs = "nutricionista"
      }

    }

}
