import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Client } from 'src/interfaces/client';
import { Observable } from 'rxjs';
import { Nutritionist } from 'src/interfaces/nutritionist';
import { Http, ResponseType } from '@angular/http';
import { Product } from 'src/interfaces/product';
import { Plan } from 'src/interfaces/plan';
import { GlobalService } from './global.service';
import { Recipe } from 'src/interfaces/recipe';
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

  constructor(private http:HttpClient, private global:GlobalService) { }


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


   get_plans_by_id(id:number):Observable<Plan[]> {
     return this.http.get<Plan[]>(this.apiURL + `Plans?id_nutricionista=${id}`);

   }

   get_product_by_plan(id_plan:number):Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + `plans/${id_plan}`);

   }

   get_recipes():Observable<Recipe[]>{
     return this.http.get<Recipe[]>(this.apiURL + `Recetas/Cliente/${this.global.current_client.id}`);
   }




  //          _________________________
  //_________/ POST

  post_client(client:Client): Observable<Client> { 
    return this.http.post<Client>(this.apiURL + "cliente", client, httpOptions);

  }

  post_nutritionist(nutricionist:Nutritionist): Observable<Nutritionist> {
    return this.http.post<Nutritionist>(this.apiURL + "nutricionista", nutricionist, httpOptions);
  }

  post_product(product:Product): Observable<Product>{
    return this.http.post<Product>(this.apiURL + "Producto", product, httpOptions);
  }

  post_plan(param:any):Observable<any> {
    return this.http.post<any>(this.apiURL + `Plans?id_nutricionista=${param.id_nutricionista}&nombre=${param.name}`, null, httpOptions);
  }

  add_product_to_plan(body:any):Observable<any>{
    return this.http.post<any>(this.apiURL + `Plans/agregarproducto`, body, httpOptions);

  }

  register_measures(body:any):Observable<any> {
    return this.http.post<any>(this.apiURL + `Cliente/registrarMedida`, body, httpOptions);
  }






  //          _________________________
  //_________/ PUT

  assign_client(id_client:number, id_nutritionist:number){
    return this.http.put<any>(this.apiURL + `cliente/nutricionist/assign?id=${id_client}&id_nutricionist=${id_nutritionist}`, httpOptions);
  }


  update_product_status(id:number, status:string): Observable<string>{
    return this.http.put<string>(this.apiURL + `Producto/${id}?estatus=${status}`, httpOptionsStringResponse);
  }


  update_product_porcion(body:any) :Observable<any>{
    return this.http.put<any>(this.apiURL + `Plans/UpdatePlanProduct?id_plan=${body.id_plan}&id_producto=${body.id_producto}&tiempo_comida=${body.tiempo_comida}&porciones=${body.porciones}`, httpOptions);


  }



  //          _________________________
  //_________/ DELETE

  delete_plan(id_plan:number): Observable<Plan> {
    return this.http.delete<Plan>(this.apiURL + `Plans?id_plan=${id_plan}`);
  }

  delete_product_from_plan(body:any):Observable<any>{
    return this.http.delete<any>(this.apiURL + `Plans/DeletePlanProduct?id_plan=${body.id_plan}&id_producto=${body.id_producto}&tiempo_comida=${body.tiempo_comida}`);

  }








}
