package com.example.nutritec_movil_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.navigation.NavHost;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.nutritec_movil_app.databinding.FragmentMainViewBinding;

/**
 * Fragmento que muestra la vista principal
 * A simple {@link Fragment} subclass.
 * Use the {@link MainView#newInstance} factory method to
 * create an instance of this fragment.
 */
public class MainView extends Fragment {

    private FragmentMainViewBinding binding;

    public MainView() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment MainView.
     */
    // TODO: Rename and change types and number of parameters
    public static MainView newInstance(String param1, String param2) {
        MainView fragment = new MainView();
        Bundle args = new Bundle();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }


    /**
     * Metodo que se llama despues de que se crea el fragmento
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentMainViewBinding.inflate(inflater, container, false);


        /**
         * Se define el comportamiento del boton para  registar medidas
         */
        binding.registerMeasuresButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                NavHostFragment.findNavController(MainView.this).navigate(R.id.action_mainView_to_registerMeasures);
            }
        });


        /**
         * Se define el comprtamiento del boton para ingresar a la gestion de recetas
         */
        binding.managerRecipeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                NavHostFragment.findNavController(MainView.this).navigate(R.id.action_mainView_to_managerRecipe);


            }
        });

        /**
         * Se define el comprtamiento del boton para ingresar a la gestion de recetas
         */
        binding.dailyConsume.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                NavHostFragment.findNavController(MainView.this).navigate(R.id.action_mainView_to_dailyRegister);


            }
        });


        return binding.getRoot();
    }
}