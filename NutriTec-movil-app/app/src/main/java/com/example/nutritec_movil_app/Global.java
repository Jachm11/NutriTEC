package com.example.nutritec_movil_app;


/**
 * Clase que permite saber si el usuario se encuentra editando o agregando una receta
 */
public class Global {

    private static boolean editing = false;
    private static boolean adding  = false;


    /**
     * Comienza el estado para agregar  una receta
     */
    public static void startAdding(){

        adding = true;
        editing = false;

    }

    /**
     * Comienza el estado para editar una receta
     */
    public static void startEditing(){
        editing = true;
        adding = false;

    }

    /**
     * Termina el estado de agregar o editar
     */
    public static void finish(){
        editing = false;
        adding = false;

    }

    /**
     * Verifica si el usuario se encuentra editando
     * @return
     */
    public static boolean isEditing(){
        return editing;
    }

    /**
     * Verifica si el usuario se encuentra agregando
     * @return
     */
    public static boolean isAdding(){
        return adding;
    }
}
