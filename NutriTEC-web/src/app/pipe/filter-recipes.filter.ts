import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRecipes',
  pure: false
})
export class FilterRecipesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultRecipes = [];

    for(const recipe of value){

      if((recipe.nombre.toLowerCase()).indexOf(arg) > -1 ){

        resultRecipes.push(recipe);

      }


    }

    return resultRecipes;


  }

}
