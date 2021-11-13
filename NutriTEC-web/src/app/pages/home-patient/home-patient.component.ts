import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent implements OnInit {

  constructor(private apiService:ApiService, public global:GlobalService) { }

  id_client:number;

  measures:any;

  ngOnInit(): void {

    this.id_client = this.global.current_client.id;
    this.apiService.get_current_stats().subscribe((measures)=> {

      this.measures = measures;
      console.log(measures);
    });

    


  }

}
