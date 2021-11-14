import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message:string = "";
  chat:any[];
  url = ''

  constructor(private apiService:ApiService, private global:GlobalService, private router:Router) {
   }

  ngOnInit(): void {

    this.url = this.router.url;
    this.get_chats();

  }

  get_chats(){

    this.apiService.get_chat_by_id(this.global.current_client.id).subscribe((chat)=>{

      this.chat = chat;
      console.log(this.chat);


    });
  }



  send_message(){


    if(this.message !== ""){


      let body = {}

      console.log(this.isClient());

      if(this.isClient()){

    

        body = {id_cliente : this.global.current_client.id, 
                    nombre_usuario: this.global.current_client.primer_nombre, 
                    rol: "Cliente", 
                    msg: this.message, num_msg:1
                  };       
      }

      if(this.isNutritionist()){

        body = {id_cliente : this.global.current_client.id, 
          nombre_usuario: this.global.current_nutritionist.primer_nombre, 
          rol: "Nutricionista", 
          msg: this.message, num_msg:1
        };    
      }

      
      console.log(body);
      this.apiService.post_message(body).subscribe(()=>{

        this.get_chats();
        this.message = "";
  
      }, (err) => {
  
        console.log("error");
      });

    }

  }


  isClient(){
    return this.url == "/profile";
  }

  isNutritionist(){
    return this.url == '';
  }


}
