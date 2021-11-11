import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css']
})
export class PatientOverviewComponent implements OnInit {

  constructor(private apiService:ApiService, private global:GlobalService) { }

  id_client:number;

  measures:any;

  ngOnInit(): void {

    this.id_client = this.global.current_client.id;
    this.apiService.get_last_measures(this.id_client).subscribe((measures)=> {

      this.measures = measures;
      console.log(measures);
    });

    


  }

}
