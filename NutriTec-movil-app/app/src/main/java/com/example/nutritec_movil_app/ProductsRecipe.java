package com.example.nutritec_movil_app;

import android.os.Build;
import android.os.Bundle;

import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;

import com.example.nutritec_movil_app.adapter.ProductAdapter;
import com.example.nutritec_movil_app.databinding.FragmentProductsRecipeBinding;
import com.example.nutritec_movil_app.entity.Product;

/**
 *  Fragmento que muestra los productos de una receta
 * A simple {@link Fragment} subclass.
 * Use the {@link ProductsRecipe#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ProductsRecipe extends Fragment {

    FragmentProductsRecipeBinding binding;



    public ProductsRecipe() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Information.
     */
    // TODO: Rename and change types and number of parameters
    public static ProductsRecipe newInstance(String param1, String param2) {
        ProductsRecipe fragment = new ProductsRecipe();


        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }


    /**
     * Funcion que se ejecuta despues de que el fragmento sea creado
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentProductsRecipeBinding.inflate(inflater, container, false);

        ArrayAdapter<Product> arrayAdapter = new ProductAdapter(getContext(), RecipeMenu.products);

        binding.recipesList.setAdapter(arrayAdapter);




        return binding.getRoot();
    }
}