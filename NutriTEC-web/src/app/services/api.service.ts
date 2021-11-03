import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Client } from 'src/interfaces/client';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = "/api/"

  constructor(private http:HttpClient) { }


  //          _________________________
  //_________/ GET



  login(email:string, clave:string):Observable<Client>{
    return this.http.get<Client>(this.apiURL + "cliente/login?email=" + email + "&clave=" + clave);

  }

   get_clients():Observable<Client[]> {
     return this.http.get<Client[]>(this.apiURL + "cliente");
    

   }




  //          _________________________
  //_________/ POST

  post_client(client:Client) { 
    return this.http.post<Client>(this.apiURL + "cliente", client, httpOptions);

  }




    //          _________________________
  //_________/ PUT

  assign_client(id_client:number, id_nutritionist:number){
    return this.http.put<any>(this.apiURL + `cliente/nutricionist/assign?id=${id_client}&id_nutricionist=${id_nutritionist}`, httpOptions);
  }









}
