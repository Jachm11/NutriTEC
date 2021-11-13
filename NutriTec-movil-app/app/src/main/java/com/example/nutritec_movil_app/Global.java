package com.example.nutritec_movil_app;

public class Global {

    private static boolean editing = false;
    private static boolean adding  = false;


    public static void startAdding(){

        adding = true;
        editing = false;

    }

    public static void startEditing(){
        editing = true;
        adding = false;

    }

    public static void finish(){
        editing = false;
        adding = false;

    }

    public static boolean isEditing(){
        return editing;
    }

    public static boolean isAdding(){
        return adding;
    }
}
