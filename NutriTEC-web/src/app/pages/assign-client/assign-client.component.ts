import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-assign-client',
  templateUrl: './assign-client.component.html',
  styleUrls: ['./assign-client.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignClientComponent implements OnInit {

  filterClient = '';

  clients = [
    {
      nombre:"sebas",
      primer_apellido:"mora",
      segundo_apellido:"godinez",
      fecha_nacimiento:"20/21/2000",
      edad:22,
      meta_consumo_diario:200,
      altura:120,
      pais:"Costa Rica"
    },
    {
      nombre:"santiago",
      primer_apellido:"mora",
      segundo_apellido:"rodriguez",
      fecha_nacimiento:"20/21/2000",
      edad:22,
      meta_consumo_diario:200,
      altura:120,
      pais:"Costa Rica"
    },
    {
      nombre:"juan",
      primer_apellido:"salinas",
      segundo_apellido:"villegas",
      fecha_nacimiento:"20/21/2000",
      edad:22,
      meta_consumo_diario:200,
      altura:120,
      pais:"Costa Rica"
    },
    {
      nombre:"pedro",
      primer_apellido:"araya",
      segundo_apellido:"molina",
      fecha_nacimiento:"20/21/2000",
      edad:22,
      meta_consumo_diario:200,
      altura:120,
      pais:"Costa Rica"
    },
    {
      nombre:"alejando",
      primer_apellido:"chavarria",
      segundo_apellido:"madriz",
      fecha_nacimiento:"20/21/2000",
      edad:22,
      meta_consumo_diario:200,
      altura:120,
      pais:"Costa Rica"
    },
    {
      nombre:"adrian",
      primer_apellido:"araya",
      segundo_apellido:"ramirez",
      fecha_nacimiento:"20/21/2000",
      edad:22,
      meta_consumo_diario:200,
      altura:120,
      pais:"Costa Rica"
    },
    {
      nombre:"shakime",
      primer_apellido:"richards",
      segundo_apellido:"sparks",
      fecha_nacimiento:"20/21/2000",
      edad:22,
      meta_consumo_diario:200,
      altura:120,
      pais:"Costa Rica"
    },
    {
      nombre:"fabian",
      primer_apellido:"barrantes",
      segundo_apellido:"perez",
      fecha_nacimiento:"20/21/2000",
      edad:22,
      meta_consumo_diario:200,
      altura:120,
      pais:"Costa Rica"
    },
    {
      nombre:"brian",
      primer_apellido:"mora",
      segundo_apellido:"godinez",
      fecha_nacimiento:"20/21/2000",
      edad:22,
      meta_consumo_diario:200,
      altura:120,
      pais:"Costa Rica"
    }
  ];

  constructor(private global:GlobalService) { }

  ngOnInit(): void {


  }

  assign_client(client:any){

    this.global.transactionSuccess("Cliente agregado exitosamente");
    console.log(client);
    //Se realiza el post



  }

}
