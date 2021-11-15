package com.example.nutritec_movil_app;

import android.app.DatePickerDialog;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.RequiresApi;
import androidx.cursoradapter.widget.SimpleCursorAdapter;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.DatePicker;
import android.widget.Toast;

import com.example.nutritec_movil_app.databinding.FragmentAddEditRecipeBinding;
import com.example.nutritec_movil_app.databinding.FragmentDailyRegisterBinding;
import com.example.nutritec_movil_app.entity.Product;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link DailyRegister#newInstance} factory method to
 * create an instance of this fragment.
 */
public class DailyRegister extends Fragment implements DatePickerDialog.OnDateSetListener {

    FragmentDailyRegisterBinding binding;

    int day;
    int month;
    int year;




    ArrayList<Product> products = new ArrayList<>();
    List<Product> current_products = new ArrayList<>();
    List<Product> products_selected = new ArrayList<>();


    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public DailyRegister() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment DailyRegister.
     */
    // TODO: Rename and change types and number of parameters
    public static DailyRegister newInstance(String param1, String param2) {
        DailyRegister fragment = new DailyRegister();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentDailyRegisterBinding.inflate(inflater, container, false);

        ArrayList<String> times_food = new ArrayList<>();
        times_food.add("Desayuno");
        times_food.add("Merienda manana");
        times_food.add("Almuerzo");
        times_food.add("Merienda tarde");
        times_food.add("Cena");

        ArrayAdapter arrayAdapter = new ArrayAdapter(getContext(), R.layout.support_simple_spinner_dropdown_item, times_food);
        binding.foodTime.setAdapter(arrayAdapter);


        this.products = ApiService.get_products();
        this.current_products = this.products;



        this.updateProductsSelectedDropDown();
        this.updateProductsDropDown();


        binding.date.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                showDatePickerDialog();


            }
        });


        /**
         * Se define el comportamiento para el boton de agregar producto
         */
        binding.addProductButton.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onClick(View view) {


                String product_selected = binding.productsDropdown.getSelectedItem().toString();
                current_products.stream().forEach(product -> {
                    if(product.descripcion.equals(product_selected)){
                        products_selected.add(product);

                        if(Global.isEditing()){
                            ApiService.add_product_to_recipe(product, ManagerRecipe.current_recipe.id);
                        }


                    }});
                updateProductsSelectedDropDown();
                current_products = current_products.stream().filter(product -> !product.descripcion.equals(product_selected)).collect(Collectors.toList());
                updateProductsDropDown();




            }
        });


        /**
         * Se define el comportamiento del boton para eliminar un producto seleccionado
         */
        binding.deleteProductButton.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onClick(View view) {

                String product_selected = binding.productsSelectedDropdown.getSelectedItem().toString();
                products_selected.stream().forEach(product -> {
                    if(product.descripcion.equals(product_selected)){
                        product.porciones = 0;
                        current_products.add(product);

                        if(Global.isEditing()){
                            ApiService.delete_product_recipe(product, ManagerRecipe.current_recipe.id);
                        }


                    }});
                updateProductsDropDown();
                products_selected = products_selected.stream().filter(product -> !product.descripcion.equals(product_selected)).collect(Collectors.toList());
                updateProductsSelectedDropDown();



            }
        });


        binding.productsSelectedDropdown.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

                String  current_product = binding.productsSelectedDropdown.getSelectedItem().toString();

                products_selected.stream().forEach(product -> {

                    if(product.descripcion.equals(current_product)){

                        binding.porcion.setText(Integer.toString(product.porciones));

                        ArrayAdapter<String> adapter = (ArrayAdapter<String>) binding.foodTime.getAdapter();

                        int pos = adapter.getPosition(product.time_food);

                        binding.foodTime.setSelection(pos);




                    }



                });


            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });


        /**
         * Se define el comportamiento para el boton que actualiza la porcion
         */
        binding.updatePorcionButton.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onClick(View view) {


                String porcion_str = binding.porcion.getText().toString();
                if(!porcion_str.equals("")) {
                    Integer porcion = Integer.parseInt(binding.porcion.getText().toString());
                    String product_selected = binding.productsSelectedDropdown.getSelectedItem().toString();
                    products_selected.stream().forEach(product -> {
                        if (product.descripcion.equals(product_selected)) {
                            product.porciones = porcion;
                            String time_food = binding.foodTime.getSelectedItem().toString();

                            product.time_food = time_food;

                            if (Global.isEditing()) {

                                ApiService.update_porcion(product, ManagerRecipe.current_recipe.id);

                            }

                            Toast.makeText(getContext(), "Se ha actualizado la porción", Toast.LENGTH_SHORT).show();
                        }
                    });



                }else {
                    Toast.makeText(getContext(), "Debe ingresar un valor para la porción", Toast.LENGTH_SHORT).show();

                }

            }
        });


        binding.addDaily.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                register();
                Toast.makeText(getContext(), "Se registro correctamente", Toast.LENGTH_LONG).show();



            }
        });

        return binding.getRoot();
    }



    /**
     * Metodo que actualiza la lista de productos
     */
    @RequiresApi(api = Build.VERSION_CODES.N)
    private void updateProductsDropDown() {


        ArrayList<String> products = new ArrayList<>();
        this.current_products.stream().forEach(product -> {
            products.add(product.descripcion);
        });

        ArrayAdapter<String> productAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_item, products);
        productAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.productsDropdown.setAdapter(productAdapter);

    }


    /**
     * Metodo que actualiza la lista de productos seleccionados
     */
    @RequiresApi(api = Build.VERSION_CODES.N)
    private void updateProductsSelectedDropDown() {

        ArrayList<String> products_selected = new ArrayList<>();
        this.products_selected.stream().forEach(product -> {
            products_selected.add(product.descripcion);
        });

        ArrayAdapter<String> productAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_item, products_selected);
        productAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.productsSelectedDropdown.setAdapter(productAdapter);

    }


    private void showDatePickerDialog() {

        DatePickerDialog datagramPacket = new DatePickerDialog(
                getContext(), this,
                Calendar.getInstance().get(Calendar.YEAR),
                Calendar.getInstance().get(Calendar.MONTH),
                Calendar.getInstance().get(Calendar.DAY_OF_WEEK)
        );

        datagramPacket.show();

    }

    @Override
    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {

        System.out.println(i + "/" + i1 + "/" + i2);
        this.day = i2;
        this.month = i1;
        this.year = i;
        binding.dateTextView.setText(i + "/" + i1 + "/" + i2);
    }


    @RequiresApi(api = Build.VERSION_CODES.N)
    public void register() {


        this.products_selected.stream().forEach(product -> {



            JSONObject body = new JSONObject();
            try {
                body.put("id_cliente", Login.current_client.id);
                body.put("id_producto", product.id);
                body.put("tiempo_comida", product.time_food);
                body.put("fecha", year + "-" + month + "-" + day    );
                body.put("cantidad_porciones", Integer.parseInt(binding.porcion.getText().toString()));


            } catch (JSONException e) {
                e.printStackTrace();
            }

            System.out.println(body.toString());

            MediaType JSON = MediaType.parse("application/json; charset=utf-8");
            RequestBody request_body = RequestBody.create(JSON, body.toString());


            Request request = new Request.Builder().url(ApiService.URL + "Cliente/registroconsumodiario").post(request_body).build();
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


        });

    }


    }