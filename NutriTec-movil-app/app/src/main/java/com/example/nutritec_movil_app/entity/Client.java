package com.example.nutritec_movil_app.entity;

public class Client {


    public int id;
    public String primer_nombre;
    public String segundo_nombre;
    public String primer_apellido;
    public String segundo_apellido;
    public String email;
    public String fecha_nacimiento;
    public int edad;
    public String pais;


    public Client(int id, String primer_nombre, String segundo_nombre, String primer_apellido, String segundo_apellido, String email, String fecha_nacimiento, int edad, String pais) {
        this.id = id;
        this.primer_nombre = primer_nombre;
        this.segundo_nombre = segundo_nombre;
        this.primer_apellido = primer_apellido;
        this.segundo_apellido = segundo_apellido;
        this.email = email;
        this.fecha_nacimiento = fecha_nacimiento;
        this.edad = edad;
        this.pais = pais;
    }
}
