import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-recipe-info',
  templateUrl: './show-recipe-info.component.html',
  styleUrls: ['./show-recipe-info.component.css']
})
export class ShowRecipeInfoComponent implements OnInit {


  @Input() recipe:any;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }


  close(){

    this.dialog.closeAll();

  }

}
