import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Client } from 'src/interfaces/client';
import { Observable } from 'rxjs';
import { Nutritionist } from 'src/interfaces/nutritionist';
import { Http, ResponseType } from '@angular/http';
import { Product } from 'src/interfaces/product';

const headers =  new HttpHeaders({
  'Content-Type':'application/json'
});


const httpOptions = {
  headers: headers
}

const httpOptionsStringResponse = {
  headers : headers,
  responseType:'text'

}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = "/api/"

  constructor(private http:HttpClient) { }


  //          _________________________
  //_________/ GET



  loginClient(email:string, clave:string):Observable<Client>{
    return this.http.get<Client>(this.apiURL + "cliente/login?email=" + email + "&clave=" + clave);

  }


  loginNutritionist(email:string, clave:string):Observable<Nutritionist>{
    return this.http.get<Nutritionist>(this.apiURL + "nutricionista/login?email=" + email + "&clave=" + clave);
  }



  get_clients():Observable<Client[]> {
     return this.http.get<Client[]>(this.apiURL + "cliente");
    
   }

   get_products():Observable<Product[]> {
     return this.http.get<Product[]>(this.apiURL + "Producto")
   }




  //          _________________________
  //_________/ POST

  post_client(client:Client) { 
    return this.http.post<Client>(this.apiURL + "cliente", client, httpOptions);

  }

  post_nutritionist(nutricionist:Nutritionist){
    return this.http.post<Nutritionist>(this.apiURL + "nutricionista", nutricionist, httpOptions);
  }

  post_product(product:Product){
    return this.http.post<string>(this.apiURL + "Producto", product, httpOptions);
  }




    //          _________________________
  //_________/ PUT

  assign_client(id_client:number, id_nutritionist:number){
    return this.http.put<any>(this.apiURL + `cliente/nutricionist/assign?id=${id_client}&id_nutricionist=${id_nutritionist}`, httpOptions);
  }


  update_product_status(id:number, status:string): Observable<string>{
    return this.http.put<string>(this.apiURL + `Producto/${id}?estatus=${status}`, httpOptionsStringResponse);
  }









}
