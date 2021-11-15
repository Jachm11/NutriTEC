package com.example.nutritec_movil_app.entity;


/**
 * Clase que modela una receta
 */
public class Recipe {

    public int id;
    public String nombre;


    /**
     * Constructor
     * @param id
     * @param nombre
     */
    public Recipe(int id, String nombre){
        this.id = id;
        this.nombre =  nombre;
    }

}
