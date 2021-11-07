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