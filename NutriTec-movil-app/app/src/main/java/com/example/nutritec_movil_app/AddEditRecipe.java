package com.example.nutritec_movil_app;

import android.hardware.camera2.TotalCaptureResult;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import com.example.nutritec_movil_app.adapter.ProductAdapter;
import com.example.nutritec_movil_app.databinding.FragmentAddEditRecipeBinding;
import com.example.nutritec_movil_app.entity.Product;
import com.example.nutritec_movil_app.entity.Recipe;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Fragmento para agregar o editar una receta
 * A simple {@link Fragment} subclass.
 * Use the {@link AddEditRecipe#newInstance} factory method to
 * create an instance of this fragment.
 */
public class AddEditRecipe extends Fragment {

    FragmentAddEditRecipeBinding binding;




    ArrayList<Product> products = new ArrayList<>();
    List<Product> current_products = new ArrayList<>();
    List<Product> products_selected = new ArrayList<>();


    public AddEditRecipe() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment AddEditRecipe.
     */
    // TODO: Rename and change types and number of parameters
    public static AddEditRecipe newInstance(String param1, String param2) {
        AddEditRecipe fragment = new AddEditRecipe();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


    }


    /**
     * Metodo que se ejecuta despues de que el fragmento sea creado
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentAddEditRecipeBinding.inflate(inflater, container, false);


        this.products = ApiService.get_products();
        this.current_products = this.products;

        if(Global.isEditing()){
            this.products_selected = RecipeMenu.products;
            binding.nameRecipe.setText(ManagerRecipe.current_recipe.nombre);
        }

        this.updateProductsSelectedDropDown();
        this.updateProductsDropDown();


        /**
         * Se define el comportamiento para el boton de agregar producto
         */
        binding.addProductButton.setOnClickListener(new View.OnClickListener() {
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
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

                String  current_product = binding.productsSelectedDropdown.getSelectedItem().toString();

                products_selected.stream().forEach(product -> {

                    if(product.descripcion.equals(current_product)){

                        binding.porcion.setText(Integer.toString(product.porciones));

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
            @Override
            public void onClick(View view) {


                String porcion_str = binding.porcion.getText().toString();
                if(!porcion_str.equals("")) {
                    Integer porcion = Integer.parseInt(binding.porcion.getText().toString());
                    String product_selected = binding.productsSelectedDropdown.getSelectedItem().toString();
                    products_selected.stream().forEach(product -> {
                        if (product.descripcion.equals(product_selected)) {
                            product.porciones = porcion;

                            if (Global.isEditing()) {

                                ApiService.update_porcion(product, ManagerRecipe.current_recipe.id);

                            }

                            Toast.makeText(getContext(), "Se ha actualizado la porción", Toast.LENGTH_SHORT).show();
                        }
                    });
                    binding.porcion.setText("0");


                }else {
                    Toast.makeText(getContext(), "Debe ingresar un valor para la porción", Toast.LENGTH_SHORT).show();

                }

            }
        });




        /**
         * Define el comportamiento del boton para agregar una receta
         */
        binding.addRecipe.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                if(Global.isAdding()){
                    ApiService.add_recpe(binding.nameRecipe.getText().toString(), products_selected);

                }

                else if(Global.isEditing()){
                    
                    ApiService.update_recipe(binding.nameRecipe.getText().toString(), ManagerRecipe.current_recipe.id ,Login.current_client.id);


                }


                Global.finish();

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

}