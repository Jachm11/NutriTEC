import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home-nutritionist',
  templateUrl: './home-nutritionist.component.html',
  styleUrls: ['./home-nutritionist.component.css']
})

/**
 * Pagina que muestra el perfil del nutricionista
 */
export class HomeNutritionistComponent implements OnInit {


  photo:any;

  constructor(public global:GlobalService) { }

  ngOnInit(): void {


    this.photo = localStorage.getItem(this.global.current_nutritionist.foto);
    console.log(this.photo);
  }

}
