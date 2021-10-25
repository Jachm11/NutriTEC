import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


    registerAsClient = true;
    registerAsNutricionist = false; 




    constructor() { }

    ngOnInit() {}


    toggleRegisterAsClient(){
        this.registerAsClient = true;
        this.registerAsNutricionist = false;

    }

    toggleRegisterAsNutricionist(){
        this.registerAsNutricionist = true;
        this.registerAsClient = false;
    }
}
