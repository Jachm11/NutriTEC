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

import java.util.ArrayList;

/**
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

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        binding = FragmentRecipeMenuBinding.inflate(inflater, container, false);

        this.products = ApiService.get_products_by_recipe(ManagerRecipe.current_recipe.id);


        binding.productsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {



                NavHostFragment.findNavController(RecipeMenu.this)
                        .navigate(R.id.action_recipeMenu_to_information);
            }
        });


        binding.informationButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {



                NavHostFragment.findNavController(RecipeMenu.this)
                        .navigate(R.id.action_recipeMenu_to_information2);
            }
        });



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


        binding.editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Global.startEditing();
                NavHostFragment.findNavController(RecipeMenu.this).navigate(R.id.action_recipeMenu_to_addEditRecipe);

            }
        });


        return binding.getRoot();
    }
}