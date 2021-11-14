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
import { Admin } from 'src/interfaces/admin';
import { Bill } from 'src/interfaces/bill';
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

  loginAdmin(email:string, clave:string):Observable<Admin>{
    return this.http.get<Admin>(this.apiURL + "/login?email=" + email + "&clave=" + clave);
  }


  get_clients():Observable<Client[]> {
     return this.http.get<Client[]>(this.apiURL + "cliente/SinNutri");
   }

  get_products():Observable<Product[]> {
     return this.http.get<Product[]>(this.apiURL + "Producto")
   }

  get_products_approved():Observable<Product[]> {
     return this.http.get<Product[]>(this.apiURL + "Producto/getAllRestricted")
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

  get_product_by_recipe(id_recipe:number):Observable<Product[]> {
     return this.http.get<Product[]>(this.apiURL + `Recetas/${id_recipe}/productos`)
   }

  get_billing_report(tipo:string):Observable<Bill[]>{
     return this.http.get<Bill[]>(this.apiURL + `reporte-cobro?tipo=${tipo}`);
   }


  get_historial():any{
     return this.http.get<any>(this.apiURL + "Cliente/medidas?id="+ this.global.current_client.id);
     //return this.http.get<any>(this.apiURL + "Cliente/medidas?id=1")
     //return this.http.get<any>(this.apiURL + "Cliente/reporteAvance?id=1&fechaInicio=2021-11-10&fechaFin=2021-11-09")
   }

   get_current_stats():Observable<any>{
      return this.http.get<any>(this.apiURL + "Cliente/lastmedidas?id=" + this.global.current_client.id)
   }

   get_client_plan_dates():Observable<any>{
     return this.http.get<any>(this.apiURL+ "Nutricionista/seguimientoplanfecha?id_cliente="+this.global.current_client.id);
   }
  get_clients_by_nutritionist(body:any):Observable<any>{
    return this.http.get<any>(this.apiURL + `Nutricionista/getAllMyClients?id_nutricionista=${body.id_nutricionist}`);
  }

   get_client_consume_dates():Observable<any>{
    return this.http.get<any>(this.apiURL+ "Nutricionista/seguimientoconsumo_fechas?id_cliente="+this.global.current_client.id);
  }

  get_client():Observable<Client>{
    return this.http.get<Client>(this.apiURL+ "cliente/"+ this.global.current_client.id);
  }

  get_one_consume_day(date):Observable<Plan[]>{
    return this.http.get<Plan[]>(this.apiURL + "Nutricionista/seguimientoconsumo_content?id_cliente="+this.global.current_client.id+"&fecha="+date)
  }

  // get_one_plan_products():Observable<any>{
  //   console.log("Hola me llamaron" , this.global.current_plan_id)
  //   return this.http.get<any>(this.apiURL + "Plans/"+ this.global.current_plan_id);
  // }

  get_nutricionista():Observable<Nutritionist>{
    return this.http.get<Nutritionist>(this.apiURL + "Nutricionista/"+this.global.full_client.id_nutricionista);
  }
  get_plan(id):Observable<Plan>{
    return this.http.get<Plan>(this.apiURL + "Plans/"+id);
  }




  //          _________________________
  //_________/ POST

  post_client(client:Client): Observable<any> { 
    return this.http.post<any>(this.apiURL + "cliente", client, httpOptions);
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

  post_recipe(body:any):Observable<any> {
    return this.http.post<any>(this.apiURL + `Recetas?id_cliente=${body.id_client}&nombre=${body.recipe_name}`, null, httpOptions);
  }

  add_product_to_plan(body:any):Observable<any>{
    return this.http.post<any>(this.apiURL + `Plans/agregarproducto`, body, httpOptions);
  }

  add_product_to_recipe(body:any):Observable<any> {
    return this.http.post<any>(this.apiURL + `Recetas/Add-Product?id_receta=${body.id_recipe}&id_producto=${body.id_product}&porciones=${body.porciones}`, null, httpOptions);
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


  update_product_porcion_plan(body:any) :Observable<any>{
    return this.http.put<any>(this.apiURL + `Plans/UpdatePlanProduct?id_plan=${body.id_plan}&id_producto=${body.id_producto}&tiempo_comida=${body.tiempo_comida}&porciones=${body.porciones}`, httpOptions);

  }

  update_product_porcion_recipe(body:any) :Observable<any>{
    return this.http.put<any>(this.apiURL + `Plans/UpdatePlanProduct?id_plan=${body.id_plan}&id_producto=${body.id_producto}&tiempo_comida=${body.tiempo_comida}&porciones=${body.porciones}`, httpOptions);

  }

  update_recipe(body:any):Observable<any> {
    console.log(body);
    return this.http.put<any>(this.apiURL + `Recetas?id_cliente=${body.id_client}&id_receta=${body.id_recipe}&nombre=${body.name}`, null, httpOptions);
  }

  unassign_client(body:any):Observable<any>{
    return this.http.put<any>(this.apiURL + `Cliente/nutricionist/unassign?id=${body.id_client}`, null, httpOptions);
  }



  //          _________________________
  //_________/ DELETE

  delete_plan(id_plan:number): Observable<Plan> {
    return this.http.delete<Plan>(this.apiURL + `Plans?id_plan=${id_plan}`);
  }

  delete_recipe(id_recipe:number):Observable<any> {
    return this.http.delete<any>(this.apiURL + `Recetas?id_receta=${id_recipe}`);
  }


  delete_product_from_plan(body:any):Observable<any>{
    return this.http.delete<any>(this.apiURL + `Plans/DeletePlanProduct?id_plan=${body.id_plan}&id_producto=${body.id_producto}&tiempo_comida=${body.tiempo_comida}`);

  }

  delete_product_from_recipe(body:any):Observable<any>{
    return this.http.delete<any>(this.apiURL + `Recetas/Remove-Product?id_receta=${body.id_recipe}&id_produco=${body.id_product}`)

  }











}
