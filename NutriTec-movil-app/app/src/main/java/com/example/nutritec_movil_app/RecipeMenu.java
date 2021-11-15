package com.example.nutritec_movil_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.nutritec_movil_app.databinding.FragmentRecipeMenuBinding;
import com.example.nutritec_movil_app.entity.Product;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Fragmento que muestra el menu de una receta
 * A simple {@link Fragment} subclass.
 * Use the {@link RecipeMenu#newInstance} factory method to
 * create an instance of this fragment.
 */
public class RecipeMenu extends Fragment {

    FragmentRecipeMenuBinding binding;


    public static ArrayList<Product> products = new ArrayList<>();


    public RecipeMenu() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment RecipeMenu.
     */
    // TODO: Rename and change types and number of parameters
    public static RecipeMenu newInstance(String param1, String param2) {
        RecipeMenu fragment = new RecipeMenu();
        Bundle args = new Bundle();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }


    /**
     * Funcion que se llama despues de que el fragmento sea creado
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        binding = FragmentRecipeMenuBinding.inflate(inflater, container, false);

        this.get_products();


        /**
         * Se define el comportamiento del boton que muestra los productos de la receta
         */
        binding.productsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                NavHostFragment.findNavController(RecipeMenu.this)
                        .navigate(R.id.action_recipeMenu_to_information);
            }
        });



        /**
         * Se define el comportamiento del boton que muestra la informacion de la receta
         */
        binding.informationButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {



                NavHostFragment.findNavController(RecipeMenu.this)
                        .navigate(R.id.action_recipeMenu_to_information2);
            }
        });




        /**
         * Se define el comportamiento del boton que elimina una receta
         */
        binding.deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                ApiService.delete_recipe(ManagerRecipe.current_recipe.id);
                Toast.makeText(getContext(), "Se eliminó exitosamente", Toast.LENGTH_LONG).show();
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction transaction = fragmentManager.beginTransaction();
                transaction.setReorderingAllowed(true);
                transaction.replace(R.id.nav_host_fragment_content_main, ManagerRecipe.class, null);
                transaction.commit();


            }

        });




        /**
         * Se define el comportamiento del boton que permite editar una receta
         */
        binding.editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Global.startEditing();
                NavHostFragment.findNavController(RecipeMenu.this).navigate(R.id.action_recipeMenu_to_addEditRecipe);

            }
        });


        return binding.getRoot();
    }


    /**
     * Metodo que obtiene los productos de una receta dada
     */
    public void get_products(){

        Request request = new Request.Builder().url(ApiService.URL + "Recetas/" +ManagerRecipe.current_recipe.id + "/productos").build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.out.println(e.getLocalizedMessage());
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                try {
                    products.clear();
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

    }
}