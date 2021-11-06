import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClients'
})
export class FilterClientsPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultClients = [];

    for(const client of value){

      if(client.primer_nombre.indexOf(arg) > -1 ){

        resultClients.push(client);

      }


    }

    return resultClients;


  }

}
