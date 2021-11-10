import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Bill } from 'src/interfaces/bill';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  bills : Bill[];

  ready = false;

  

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {

    this.apiService.get_billing_report().subscribe((bills)=>{
      this.bills = bills;
      this.ready = true;
      console.log(this.bills[0].correo_electronico)

    })

  }

}
