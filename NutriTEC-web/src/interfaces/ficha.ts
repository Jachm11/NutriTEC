import { Product_Consumption } from "./product"
import { Total_nutricional } from "./total_nutricional";

export class Ficha {

    fecha: string
    nombre_plan: string
    productos_plan: Product_Consumption[]
    total_plan: Total_nutricional
    productos_consumo : Product_Consumption[]
    total_consumo: Total_nutricional 

}

export class Plan_event{
    
    title:string
    start:string
    groupId:"plan"
    color : "#508AA8"
    id:number

}

export class Consume_event{
    
    title:"Consumo diario"
    start:string
    groupId:"consumo"
    color : "#06D6A0"

}