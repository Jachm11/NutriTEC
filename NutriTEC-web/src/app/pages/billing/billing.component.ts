import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Bill } from 'src/interfaces/bill';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  bills_semanal : Bill[];
  bills_mensual : Bill[];
  bills_anual : Bill[];
  date = new Date();
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  ready = false;

  

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {

    this.apiService.get_billing_report("semanal").subscribe((bills)=>{
      this.bills_semanal = bills;
      console.log(this.bills_semanal);

    })

    this.apiService.get_billing_report("mensual").subscribe((bills)=>{
      this.bills_mensual = bills;
      console.log(this.bills_mensual);

    })

    this.apiService.get_billing_report("anual").subscribe((bills)=>{
      this.bills_anual = bills;
      this.ready = true;
      console.log(this.bills_anual);

    })

  }

  /**
   * Funcion que crea y descarga el PDF de la factura
   */
   public downloadAsPDF() {

    const doc = new jsPDF('p', 'pt', [1425, 1425]);

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 500,
      'elementHandlers': specialElementHandlers
    });

    doc.save('Reporte de cobro NutriTEC.pdf');

  }

}
