package com.example.nutritec_movil_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Toast;

import com.example.nutritec_movil_app.adapter.RecipeAdapter;
import com.example.nutritec_movil_app.databinding.FragmentManagerRecipeBinding;
import com.example.nutritec_movil_app.entity.Recipe;

import java.util.ArrayList;

/**
 * Fragmento que muestra la gestion de receta. Muestra todas las recetas
 * asociadas a un cliente
 * A simple {@link Fragment} subclass.
 * Use the {@link ManagerRecipe#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ManagerRecipe extends Fragment {


    FragmentManagerRecipeBinding binding;
    public static Recipe current_recipe;



    public ManagerRecipe() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment ManagerRecipe.
     */
    // TODO: Rename and change types and number of parameters
    public static ManagerRecipe newInstance(String param1, String param2) {
        ManagerRecipe fragment = new ManagerRecipe();
        Bundle args = new Bundle();
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
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        binding = FragmentManagerRecipeBinding.inflate(inflater, container, false);

        ArrayList<Recipe> recipes = ApiService.get_recipes(Login.current_client.id);
        System.out.println(recipes.size());

        RecipeAdapter recipesAdapter = new RecipeAdapter(getContext(), recipes);

        binding.recipesList.setAdapter(recipesAdapter);


        /**
         * Se deifine el comportamiento cuando uno de los items de la lista
         * de recetas sea creado
         */
        binding.recipesList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {


                current_recipe = ((Recipe) binding.recipesList.getItemAtPosition(i));


                NavHostFragment.findNavController(ManagerRecipe.this)
                        .navigate(R.id.action_managerRecipe_to_recipeMenu);
            }
        });


        /**
         * Se define el comportamiento del boton para agregar recetas
         */
        binding.addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                Global.startAdding();
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction transaction = fragmentManager.beginTransaction();
                transaction.setReorderingAllowed(true);

                transaction.replace(R.id.nav_host_fragment_content_main, AddEditRecipe.class, null);

                transaction.commit();

            }
        });

        return binding.getRoot();
    }
}