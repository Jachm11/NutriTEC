import { Component, OnInit } from '@angular/core';
import { provideRoutes, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { Product } from 'src/interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products-approval',
  templateUrl: './products-approval.component.html',
  styleUrls: ['./products-approval.component.css']
})
export class ProductsApprovalComponent implements OnInit {

  url: string;
  filter_option: string = 'TODOS';
  products = [];
  current_products = new BehaviorSubject<Product[]>(this.products);

  constructor(private router: Router, private global: GlobalService, private apiService: ApiService) {
    this.url = this.router.url;
  }

  ngOnInit(): void {
    this.get_products();
  }

  get_products() {
    this.apiService.get_products().subscribe((products) => {

      this.products = products;
      this.current_products.next(products);
      this.filter();

    });
  }

  filter() {

    if (this.filter_option == 'APROBADO') {
      this.current_products.next(this.products.filter(pr => pr.estatus == 'APROBADO'));
    }

    else if (this.filter_option == 'RECHAZADO') {
      this.current_products.next(this.products.filter(pr => pr.estatus == 'RECHAZADO'));
    }

    else if (this.filter_option == 'ESPERA') {
      this.current_products.next(this.products.filter(pr => pr.estatus == 'ESPERA'));
    }

    else if (this.filter_option == 'TODOS') {
      this.current_products.next(this.products)
    }
  }


  accept_product(product: any) {

    this.apiService.update_product_status(product.id, "APROBADO").subscribe(() => {
      this.global.transactionSuccess("Producto aprobado exitosamente");
        this.get_products();
    }, (err) => {
      this.global.transactionFailed("Se ha producido un error, por favor intente nuevamente");
    });

  }

  reject_product(product: any) {

    this.apiService.update_product_status(product.id, "RECHAZADO").subscribe(() => {
      this.global.transactionSuccess("Producto rechazado exitosamente");
        this.get_products();
    }, (err) => {
      this.global.transactionFailed("Se ha producido un error, por favor intente nuevamente");
    });

  }

}
