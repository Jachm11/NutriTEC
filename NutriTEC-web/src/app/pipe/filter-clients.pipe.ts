import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClients'
})
export class FilterClientsPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultClients = [];

    for(const client of value){

      if(client.nombre.indexOf(arg) > -1 ){

        resultClients.push(client);

      }
      else if (client.primer_apellido.indexOf(arg) > -1 && resultClients === []){

        resultClients.push(client);
      }

      else if (client.segundo_apellido.indexOf(arg) > -1 && resultClients === []){

        resultClients.push(client); 
      }


    }

    return resultClients;


  }

}
