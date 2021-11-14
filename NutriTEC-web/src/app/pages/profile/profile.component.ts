import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from 'src/app/components/chat/chat.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    constructor(private dialog:MatDialog) { }

    ngOnInit() {}


    open(){


        const dialogRef = this.dialog.open(ChatComponent);

        
        console.log("entraa");
    }

}
