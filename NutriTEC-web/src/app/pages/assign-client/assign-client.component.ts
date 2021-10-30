import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

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
      nombre:"Santiago"
    }
  ];

  constructor() { }

  ngOnInit(): void {


  }

}
