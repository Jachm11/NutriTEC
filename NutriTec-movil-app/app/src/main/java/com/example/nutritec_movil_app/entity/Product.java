package com.example.nutritec_movil_app.entity;

public class Product {

    public int id;
    public int barcode;
    public String descripcion;
    public int tamano_porciones;
    public int porciones;
    public int sodio;
    public int grasa;
    public int energia;
    public int hierro;
    public int calcio;
    public int proteina;
    public int vitamina;
    public int carbohidratos;

    public Product(int id, int barcode, String descripcion, int tamano_porciones, int porciones, int sodio, int grasa, int energia, int hierro, int calcio, int proteina, int vitamina, int carbohidratos) {
        this.id = id;
        this.barcode = barcode;
        this.descripcion = descripcion;
        this.tamano_porciones = tamano_porciones;
        this.porciones = porciones;
        this.sodio = sodio;
        this.grasa = grasa;
        this.energia = energia;
        this.hierro = hierro;
        this.calcio = calcio;
        this.proteina = proteina;
        this.vitamina = vitamina;
        this.carbohidratos = carbohidratos;
    }
}
