import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private client: boolean;

    constructor(public location: Location, private router: Router) {
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isClient() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/home-patient' ) {
            this.client = true;
            return true;
        }
        if( titlee === '#/daily-register' ) {
            this.client = true;
            return true;
        }
        if( titlee === '#/register-product' && this.client ) {
            return true;
        }
        if( titlee === '#/manager-recipe' ) {
            this.client = true;
            return true;
        }
        if( titlee === '#/measurement-register' ) {
            this.client = true;
            return true;
        }
        if( titlee === '#/personal-record' ) {
            this.client = true;
            return true;
        }
        else {
            return false;
        }
    }

    isAdmin(){

        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/products-approval' ) {
            this.client = false;
            return true;
        }
        if( titlee === '#/billing' ) {
            this.client = false;
            return true;
        }

    }

    isNutritionist(){

        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/home-nutritionist' ) {
            this.client = false;
            return true;
        }
        if( titlee === '#/assign-client' ) {
            this.client = false;
            return true;
        }
        if( titlee === '#/patient-overview'  ) {
            this.client = false;  
            return true;
        }
        if( titlee === '#/patient-calendar'  ) {
            this.client = false;  
            return true;
        }

        if( titlee === '#/manager-plan' ) {
            this.client = false;
            return true;
        }
        if( titlee === '#/assign-plan' ) {
            this.client = false;
            return true;
        }

        if( titlee === '#/register-product' && this.client == false ) {
            return true;
        }
        
        else {
            return false;
        }

    }

    isLogged(){
        if (this.isClient() || this.isAdmin() || this.isNutritionist()){
            return true;
        }
        else{
            return false;
        }
    }
}
