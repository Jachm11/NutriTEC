package com.example.nutritec_movil_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.nutritec_movil_app.databinding.FragmentInformationBinding;
import com.example.nutritec_movil_app.entity.Product;

import java.util.HashMap;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Information#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Information extends Fragment {


    FragmentInformationBinding binding;
    int sodio = 0;
    int grasa = 0;
    int energia = 0;
    int hierro = 0;
    int calcio = 0;
    int proteina = 0;
    int vitamina = 0;
    int carbohidratos = 0;



    public Information() {
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
    public static Information newInstance(String param1, String param2) {
        Information fragment = new Information();
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

        binding = FragmentInformationBinding.inflate(inflater, container, false);


        for(Product product : RecipeMenu.products){

            this.sodio += product.sodio;
            this.grasa += product.grasa;
            this.energia += product.energia;
            this.hierro += product.hierro;
            this.calcio += product.calcio;
            this.proteina += product.proteina;
            this.vitamina += product.vitamina;
            this.carbohidratos += product.carbohidratos;
        }


        binding.sodio.setText("Sodio: " + this.sodio);
        binding.grasa.setText("Grasa: " + this.grasa);
        binding.energia.setText("Energía: " + this.energia);
        binding.hierro.setText("Hierro: " + this.hierro);
        binding.calcio.setText("Calcio: " + this.calcio);
        binding.proteina.setText("Proteía: " + this.proteina);
        binding.vitamina.setText("Vitamina: " + this.vitamina);
        binding.carbohidratos.setText("Carbohidratos: " + this.carbohidratos);










        return binding.getRoot();
    }
}