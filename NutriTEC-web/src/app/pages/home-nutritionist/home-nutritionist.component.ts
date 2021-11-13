import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home-nutritionist',
  templateUrl: './home-nutritionist.component.html',
  styleUrls: ['./home-nutritionist.component.css']
})
export class HomeNutritionistComponent implements OnInit {

  constructor(public global:GlobalService) { }

  ngOnInit(): void {
  }

}
