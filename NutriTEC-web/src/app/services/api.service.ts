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

  private apiURL = "https://nutritec.azurewebsites.net/"

  constructor(private http:HttpClient) { }


  //          _________________________
  //_________/ GET


   get_clients():Observable<Client> {
     return this.http.get<Client>(this.apiURL + "cliente");

   }




  //          _________________________
  //_________/ POST

  post_clients(client:Client):Observable<Client> {
    return this.http.post<Client>(this.apiURL + "cliente", client, httpOptions);

  }





}
