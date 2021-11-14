import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})

/**
 * Paguna que muestra el perfil del paciente
 */
export class HomePatientComponent implements OnInit {

  constructor(private apiService:ApiService, public global:GlobalService) { }

  id_client:number;
  measures:any;
  nutritionist:any;
  current_client:any;

  ngOnInit(): void {

    this.current_client = this.global.current_client;
    this.id_client = this.global.current_client.id;
    this.apiService.get_current_stats().subscribe((measures)=> {

      this.measures = measures;


    });



    if(this.current_client.id_nutricionista != -1){
        console.log("entraaa");
        let body = {id_nutritionist: this.global.current_client.id_nutricionista}
        this.apiService.get_nutritionist_by_id(body).subscribe((nutritionist) =>{
        this.nutritionist = nutritionist;
      
      });



    }




    


  }

}
