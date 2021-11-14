package com.example.nutritec_movil_app;

import android.os.Build;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.example.nutritec_movil_app.entity.Product;
import com.example.nutritec_movil_app.entity.Recipe;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ApiService {


    public static final String URL = "https://nutritec.azurewebsites.net/";
    private static ArrayList<JSONObject> body = new ArrayList<JSONObject>();


    public static JSONObject login(String email, String password){

        Request request = new Request.Builder().url(URL + "cliente/login?email=" + email + "&clave=" + password).addHeader("Content-Type", "application/json").build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                String data = response.body().source().readUtf8();
                String data2 = data.substring(0, data.length());

                try {
                    JSONObject res = new JSONObject(data2);
                    System.out.println(res.toString());
                    body.add(res);



                } catch (JSONException e) {


                }

            }
        });



        try {
            Thread.sleep(2000);
            if(body.size() == 0){
                return null;
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return body.get(0);


    }


    public static void register_measures(String weight, String muscles, String fat, String hips, String waist, String neck, String height) {
        JSONObject body = new JSONObject();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        String date = sdf.format(c.getTime());
        try {
            body.put("id_cliente", Login.current_client.id);
            body.put("fecha", date);
            body.put("porcentaje_musculo", Integer.parseInt(muscles));
            body.put("porcentaje_grasa", Integer.parseInt(fat));
            body.put("cadera", Integer.parseInt(hips));
            body.put("peso", Integer.parseInt(weight));
            body.put("altura", Integer.parseInt(height));
            body.put("cintura", Integer.parseInt(waist));
            body.put("cuello", Integer.parseInt(neck));
            MediaType JSON = MediaType.parse("application/json; charset=utf-8");
            RequestBody request_body = RequestBody.create(JSON, body.toString());
            Request request = new Request.Builder().url(URL + "Cliente/registrarMedida").post(request_body).build();
            OkHttpClient client = new OkHttpClient();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    System.out.println(response);
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    public static ArrayList<Recipe> get_recipes(int id){
        ArrayList<Recipe> recipes = new ArrayList<>();
        Request request = new Request.Builder().url(URL + "Recetas/Cliente/" + id).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) { }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                try {
                    JSONArray json_response = new JSONArray(response.body().source().readUtf8());
                    for(int i=0; i< json_response.length(); i++){
                        JSONObject current_recipe = (JSONObject) json_response.get(i);
                        recipes.add(new Recipe(current_recipe.getInt("id"), current_recipe.getString("nombre")));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        sleep();

        return recipes;

    }


    public static ArrayList<Product> get_products_by_recipe(int id_recipe){

        ArrayList<Product> products = new ArrayList<>();
        Request request = new Request.Builder().url(URL + "Recetas/" +id_recipe + "/productos").build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.out.println(e.getLocalizedMessage());
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                try {
                    String data = response.body().source().readUtf8();
                    JSONArray json_response = new  JSONArray(data);
                    for(int i=0; i< json_response.length(); i++){
                        JSONObject current_product = (JSONObject) json_response.get(i);
                        products.add(new Product(current_product.getInt("id"),
                                current_product.getInt("barcode"),
                                current_product.getString("descripcion"),
                                current_product.getInt("tamano_porcion"),
                                current_product.getInt("porciones"),
                                current_product.getInt("sodio"),
                                current_product.getInt("grasa"),
                                current_product.getInt("energia"),
                                current_product.getInt("hierro"),
                                current_product.getInt("calcio"),
                                current_product.getInt("proteina"),
                                current_product.getInt("vitamina"),
                                current_product.getInt("carbohidratos")));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });


        sleep();



        return products;



    }



    public static void delete_recipe(int id_recipe){
        Request request = new Request.Builder().url(URL + "Recetas?id_receta=" +id_recipe).delete().build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                System.out.println(response);
            }
        });



    }


    public static ArrayList<Product> get_products(){

        ArrayList<Product> products = new ArrayList<>();
        Request request = new Request.Builder().url(URL + "Producto/getAllRestricted").build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

                System.out.println(e.getLocalizedMessage());

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                try {

                    String data = response.body().source().readUtf8();
                    JSONArray json_response = new  JSONArray(data);

                    for(int i=0; i< json_response.length(); i++){

                        JSONObject current_product = (JSONObject) json_response.get(i);
                        products.add(new Product(current_product.getInt("id"),
                                current_product.getInt("barcode"),
                                current_product.getString("descripcion"),
                                current_product.getInt("tamano_porcion"),
                                0,
                                current_product.getInt("sodio"),
                                current_product.getInt("grasa"),
                                current_product.getInt("energia"),
                                current_product.getInt("hierro"),
                                current_product.getInt("calcio"),
                                current_product.getInt("proteina"),
                                current_product.getInt("vitamina"),
                                current_product.getInt("carbohidratos")));

                    }


                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });


        sleep();



        return products;

    }



    public static void add_recpe(String name_recipe, List<Product> products){

        JSONObject body = new JSONObject();
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");
        RequestBody request_body = RequestBody.create(JSON, body.toString());


        Request request = new Request.Builder().url(URL + "Recetas?id_cliente=" + 1 + "&nombre=" + name_recipe).post(request_body).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
            }
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onResponse(Call call, Response response) throws IOException {

                String res = response.body().source().readUtf8();
                System.out.println(res);
                try {
                    JSONObject body = new JSONObject(res);
                    System.out.println("Se agrego correctamente");

                    int id_recipe = body.getInt("id");

                    products.stream().forEach(product -> {

                        add_product_to_recipe(product, id_recipe);



                    });






                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
        });
    }

    public static void add_product_to_recipe(Product product, int id_recipe){

        JSONObject body = new JSONObject();
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");
        RequestBody request_body = RequestBody.create(JSON, body.toString());

        Request request = new Request.Builder().url(URL + "Recetas/Add-Product?id_receta="+ id_recipe + "&id_producto="+ product.id +"&porciones=" + product.porciones).post(request_body).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                System.out.println(response);

            }
        });

    }

    public static void delete_product_recipe(Product product, int id_recipe) {

        Request request = new Request.Builder().url(URL + "Recetas/Remove-Product?id_receta=" + id_recipe + "&id_producto=" + product.id).delete().build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                System.out.println(response);

            }
        });

    }

    public static void update_porcion(Product product, int id_recipe) {

        JSONObject body = new JSONObject();
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");
        RequestBody request_body = RequestBody.create(JSON, body.toString());

        Request request = new Request.Builder().url(URL + "Recetas/Update-Product?id_receta=" + id_recipe + "&id_producto=" + product.id + " &porciones=" + product.porciones).put(request_body).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                System.out.println(response);

            }
        });

    }

    public static void update_recipe(String name_recipe, int id_recipe, int id_cliente) {

        JSONObject body = new JSONObject();
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");
        RequestBody request_body = RequestBody.create(JSON, body.toString());

        Request request = new Request.Builder().url(URL + "Recetas?id_cliente="+ id_cliente +"&id_receta="+ id_recipe + "&nombre="+ name_recipe).put(request_body).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                System.out.println(response);

            }
        });

    }


    public static void sleep(){

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
