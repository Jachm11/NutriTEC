package com.example.nutritec_movil_app;

import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ApiService {


    private static final String URL = "https://nutritec.azurewebsites.net/";
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
            Thread.sleep(3000);
            if(body.size() == 0){
                return null;
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return body.get(0);


    }


    public static void register_measures(String weight, String muscles, String fat, String hips, String waist, String neck, String height){



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

            System.out.println(body.toString());
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

}
