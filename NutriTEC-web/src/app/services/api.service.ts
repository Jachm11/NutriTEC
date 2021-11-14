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

/**
 * Este servicio es el encargado de manejar todos las interacciones con el API. De aqui se emiten los
 * querys HTTP hacia las url indicadas
 */
export class ApiService {

  private apiURL = "https://nutritec.azurewebsites.net/"
  private apiURLmongo = `https://nutritecforum.azurewebsites.net/api/`

  constructor(private http:HttpClient, private global:GlobalService) { }


  //          _________________________
  //_________/ GET



    /**
   * Funcion GET para realizar el login del cliente
   * @returns JSON con todos los datos del cliente
   */
  loginClient(email:string, clave:string):Observable<Client>{
    return this.http.get<Client>(this.apiURL + "cliente/login?email=" + email + "&clave=" + clave);

  }

    /**
   * Funcion GET para realizar el login del nutricionista
   * @returns JSON con todos los datos del nutricionista
   */
  loginNutritionist(email:string, clave:string):Observable<Nutritionist>{
    return this.http.get<Nutritionist>(this.apiURL + "nutricionista/login?email=" + email + "&clave=" + clave);
  }


    /**
   * Funcion GET para realizar el login del administrador
   * @returns JSON con todos los datos del administrador
   */
  loginAdmin(email:string, clave:string):Observable<Admin>{
    return this.http.get<Admin>(this.apiURL + "/login?email=" + email + "&clave=" + clave);
  }


  /**
   * Funcion GET para para obtener la informacion de los clientes sin nutricionista
   * @returns JSON con todos los datos del cliente sin nutricionista
   */
  get_clients():Observable<Client[]> {
     return this.http.get<Client[]>(this.apiURL + "cliente/SinNutri");
    
   }


  /**
   * Funcion GET para para obtener la informacion de los todos los productos
   * @returns JSON con todos los datos de los productis
   */
  get_products():Observable<Product[]> {
     return this.http.get<Product[]>(this.apiURL + "Producto")
   }

    /**
   * Funcion GET para para obtener la informacion de los productos aprobados
   * @returns JSON con todos los datos de los productos aprobados
   */
  get_products_approved():Observable<Product[]> {
     return this.http.get<Product[]>(this.apiURL + "Producto/getAllRestricted")
   }



    /**
   * Funcion GET para para obtener los planes de un nutricionista
   * @returns JSON con todos los planes asociados a un nutricionista
   */
  get_plans_by_id(id:number):Observable<Plan[]> {
     return this.http.get<Plan[]>(this.apiURL + `Plans?id_nutricionista=${id}`);

   }

  /**
  * Funcion GET para para obtener productos de un plan 
  * @returns JSON con todos los productos asociados a un plan 
  */
  get_product_by_plan(id_plan:number):Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + `plans/${id_plan}`);

   }

  /**
   * Funcion GET para para obtener las recetas de un clientes
   * @returns JSON con todos las recetas asociados a un cliente
   */
  get_recipes():Observable<Recipe[]>{
     return this.http.get<Recipe[]>(this.apiURL + `Recetas/Cliente/${this.global.current_client.id}`);
   }


    /**
   * Funcion GET para para obtener los productos de una receta
   * @returns JSON con todas las recetas asosiacos 
   */
  get_product_by_recipe(id_recipe:number):Observable<Product[]> {
     return this.http.get<Product[]>(this.apiURL + `Recetas/${id_recipe}/productos`)
   }


  /**
  * Funcion GET para para obtener el reporta de cobro
  * @returns JSON con todos los reportes de cobro 
  */
  get_billing_report(tipo:string):Observable<Bill[]>{
     return this.http.get<Bill[]>(this.apiURL + `reporte-cobro?tipo=${tipo}`);
   }



      /**
   * Funcion GET para para obtener el historial de las medidas de un cliente
   * @returns JSON con el historial de medidas de un cliente 
   */
  get_historial():any{
     return this.http.get<any>(this.apiURL + "Cliente/medidas?id="+ this.global.current_client.id);
     //return this.http.get<any>(this.apiURL + "Cliente/medidas?id=1")
     //return this.http.get<any>(this.apiURL + "Cliente/reporteAvance?id=1&fechaInicio=2021-11-10&fechaFin=2021-11-09")
   }


  /**
   * Funcion GET para para obtener los planes de un nutricionista
   * @returns JSON con todos los planes asociados a un nutricionista
   */
   get_historial_by_dates(from_date:string, to_date:string){
    return this.http.get<any>(this.apiURL + `Cliente/reporteAvance?id=1&fechaInicio=${from_date}&fechaFin=${to_date}`);
   }


  /**
   * Funcion GET para para obtener las medidas actuales de un paciente 
   * @returns JSON con las medidas actuales de un cliente
  */
  get_current_stats():any{
      return this.http.get<any>(this.apiURL + "Cliente/lastmedidas?id=" + this.global.current_client.id)
   }


  /**
   * Funcion GET para para obtener los clientes asociados a un nutricionista
   * @returns JSON con todos los planes asociados a un nutricionista
  */
  get_clients_by_nutritionist(body:any):Observable<any>{
    return this.http.get<any>(this.apiURL + `Nutricionista/getAllMyClients?id_nutricionista=${body.id_nutricionist}`);
  }


  /**
   * Funcion GET para para obtener un nutricionista dado un id
   * @returns JSON con la informacion de un nutricipnista
   */
  get_nutritionist_by_id(body:any):Observable<any> {
    return this.http.get<any>(this.apiURL + `nutricionista/${body.id_nutritionist}`);

  }


  /**
   * Funcion GET para para obtener los mensajes de un cliente 
   * @returns JSON con todos los mensajes de un chat de un cliente
  */
  get_chat_by_id(id_client:number):Observable<any>{
    return this.http.get<any>(this.apiURLmongo + `chats/${id_client}`);
  }







  //          _________________________
  //_________/ POST


    /**
   * Funcion POST para un cliente 
   * @param cliente cliente a crear
   * @returns repuesta del API
   */
  post_client(client:Client): Observable<any> { 
    return this.http.post<any>(this.apiURL + "cliente", client, httpOptions);
  }

    /**
   * Funcion POST para un nutricionista 
   * @param nutricionist nutricionista a crear
   * @returns repuesta del API
   */
  post_nutritionist(nutricionist:Nutritionist): Observable<Nutritionist> {
    return this.http.post<Nutritionist>(this.apiURL + "nutricionista", nutricionist, httpOptions);
  }


    /**
   * Funcion POST para un producto 
   * @param product producto a crear
   * @returns repuesta del API
   */
  post_product(product:Product): Observable<Product>{
    return this.http.post<Product>(this.apiURL + "Producto", product, httpOptions);
  }

    /**
   * Funcion POST para un plan 
   * @param param informacion del plan a crear
   * @returns repuesta del API
   */
  post_plan(param:any):Observable<any> {
    return this.http.post<any>(this.apiURL + `Plans?id_nutricionista=${param.id_nutricionista}&nombre=${param.name}`, null, httpOptions);
  }

  /**
   * Funcion POST para un receta 
   * @param body informacion de la receta a crear
   * @returns repuesta del API
   */
  post_recipe(body:any):Observable<any> {
    return this.http.post<any>(this.apiURL + `Recetas?id_cliente=${body.id_client}&nombre=${body.recipe_name}`, null, httpOptions);
  }

  /**
   * Funcion POST para un agregar un producto a un plan 
   * @param body informacion del plan a crear
   * @returns repuesta del API
   */
  add_product_to_plan(body:any):Observable<any>{
    return this.http.post<any>(this.apiURL + `Plans/agregarproducto`, body, httpOptions);
  }

    /**
   * Funcion POST para agregar un producto a una receta 
   * @param body informacion de un producto 
   * @returns repuesta del API
   */
  add_product_to_recipe(body:any):Observable<any> {
    return this.http.post<any>(this.apiURL + `Recetas/Add-Product?id_receta=${body.id_recipe}&id_producto=${body.id_product}&porciones=${body.porciones}`, null, httpOptions);
  }

    /**
   * Funcion POST para registrar las medidas de un cliente 
   * @param body informacion de las medidas d
   * @returns repuesta del API
   */
  register_measures(body:any):Observable<any> {
    return this.http.post<any>(this.apiURL + `Cliente/registrarMedida`, body, httpOptions);
  }


  /**
   * Funcion POST para un enviar un mensaje 
   * @param body informacion de un mensaje
   * @returns repuesta del API
   */
  post_message(body:any):Observable<any> {
    return this.http.post<any>(this.apiURLmongo + `chats/`, body, httpOptions);

  }






  //          _________________________
  //_________/ PUT


  /**
   * Funcion PUT para asignar un cliente a un nutricionista
   * @param id_client id del cliente
   * @param id_nutritionist id del nutricionista 
   * @returns repuesta del api
   */
  assign_client(id_client:number, id_nutritionist:number){
    return this.http.put<any>(this.apiURL + `cliente/nutricionist/assign?id=${id_client}&id_nutricionist=${id_nutritionist}`, httpOptions);
  }


    /**
   * Funcion PUT para actualizar el estado de un producto
   * @param id id del producto
   * @param status nuevo estatus
   * @returns repuesta del api
   */
  update_product_status(id:number, status:string): Observable<string>{
    return this.http.put<string>(this.apiURL + `Producto/${id}?estatus=${status}`, httpOptionsStringResponse);
  }


    /**
   * Funcion PUT para actualizar la porcion de un producto
   * @param body informacion necesaria para hacer el request
   * @returns repuesta del api
   */
  update_product_porcion_plan(body:any) :Observable<any>{
    return this.http.put<any>(this.apiURL + `Plans/UpdatePlanProduct?id_plan=${body.id_plan}&id_producto=${body.id_producto}&tiempo_comida=${body.tiempo_comida}&porciones=${body.porciones}`, httpOptions);

  }

    /**
   * Funcion PUT para actualizar los asientos comprados en la base de datos
   * @param seat Los datos del asiento comprado
   * @returns repuesta del api
   */
  update_product_porcion_recipe(body:any) :Observable<any>{
    return this.http.put<any>(this.apiURL + `Recetas/Update-Product?id_receta=${body.id_recipe}&id_producto=${body.id_producto}&&porciones=${body.porciones}`, httpOptions);

  }

    /**
   * Funcion PUT para actualizar una receta
   * @param body informacion de una receta
   * @returns repuesta del api
   */
  update_recipe(body:any):Observable<any> {
    console.log(body);
    return this.http.put<any>(this.apiURL + `Recetas?id_cliente=${body.id_client}&id_receta=${body.id_recipe}&nombre=${body.name}`, null, httpOptions);
  }


  /**
   * Funcion PUT para desasociar a un cliente
   * @param body informacion deun cliente 
   * @returns repuesta del api
   */
  unassign_client(body:any):Observable<any>{
    return this.http.put<any>(this.apiURL + `Cliente/nutricionist/unassign?id=${body.id_client}`, null, httpOptions);
  }



  //          _________________________
  //_________/ DELETE



  /**
  * Funcion DELETE para un plan
  * @param id_plan id de un plan
  * @returns repuesta del API
  */
  delete_plan(id_plan:number): Observable<Plan> {
    return this.http.delete<Plan>(this.apiURL + `Plans?id_plan=${id_plan}`);
  }

    /**
  * Funcion DELETE para una receta
  * @param id_recipe id de una receta
  * @returns repuesta del API
  */
  delete_recipe(id_recipe:number):Observable<any> {
    return this.http.delete<any>(this.apiURL + `Recetas?id_receta=${id_recipe}`);
  }


    /**
  * Funcion DELETE de un producto para un plan
  * @param body infomracion de un producto
  * @returns repuesta del API
  */
  delete_product_from_plan(body:any):Observable<any>{
    return this.http.delete<any>(this.apiURL + `Plans/DeletePlanProduct?id_plan=${body.id_plan}&id_producto=${body.id_producto}&tiempo_comida=${body.tiempo_comida}`);

  }

    /**
  * Funcion DELETE para una receta
  * @param body informacion de un producto
  * @returns repuesta del API
  */
  delete_product_from_recipe(body:any):Observable<any>{
    return this.http.delete<any>(this.apiURL + `Recetas/Remove-Product?id_receta=${body.id_recipe}&id_producto=${body.id_product}`)

  }

    /**
  * Funcion DELETE para un chat
  * @param id_client id del cliente
  * @returns repuesta del API
  */
  delete_chat(id_client:number){
    return this.http.delete<any>(this.apiURL + `chats/${id_client}`);

  }











}
