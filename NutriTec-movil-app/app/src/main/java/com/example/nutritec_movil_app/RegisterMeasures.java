package com.example.nutritec_movil_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentResultListener;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.nutritec_movil_app.databinding.FragmentRegisterMeasuresBinding;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Fragmento para registar las medidas
 * A simple {@link Fragment} subclass.
 * Use the {@link RegisterMeasures#newInstance} factory method to
 * create an instance of this fragment.
 */
public class RegisterMeasures extends Fragment {


    private FragmentRegisterMeasuresBinding binding;


    public RegisterMeasures() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment RegisterMeasures.
     */
    // TODO: Rename and change types and number of parameters
    public static RegisterMeasures newInstance(String param1, String param2) {
        RegisterMeasures fragment = new RegisterMeasures();
        Bundle args = new Bundle();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }


    /**
     * Metodo que se ejecuta cuando el fragmento es creado
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        binding = FragmentRegisterMeasuresBinding.inflate(inflater, container, false);


        /**
         * Se define las instrucciones que se ejecutaran cuando el boton de
         * registrar medidas sea presionado
         */
        binding.registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String weight = binding.weight.getText().toString();
                String height = binding.height.getText().toString();
                String muscles = binding.muscles.getText().toString();
                String fat = binding.fat.getText().toString();
                String hips = binding.hips.getText().toString();
                String waist = binding.waist.getText().toString();
                String neck  = binding.neck.getText().toString();

                if(weight.equals("")){
                    Toast.makeText(getContext(), "Ingrese el valor del peso", Toast.LENGTH_LONG).show();
                }
                else if(height.equals("")){
                    Toast.makeText(getContext(), "Ingrese el valor de la altura", Toast.LENGTH_LONG).show();
                }
                else if(muscles.equals("")){
                    Toast.makeText(getContext(), "Ingrese el % de musculo", Toast.LENGTH_LONG).show();
                }
                else if(fat.equals("")){
                    Toast.makeText(getContext(), "Ingrese el % de grasa", Toast.LENGTH_LONG).show();
                }
                else if(hips.equals("")){
                    Toast.makeText(getContext(), "Ingrese la medida de cadera", Toast.LENGTH_LONG).show();
                }
                else if(waist.equals("")){
                    Toast.makeText(getContext(), "Ingrese la medida de cintura", Toast.LENGTH_LONG).show();
                }
                else if(neck.equals("")){
                    Toast.makeText(getContext(), "Ingrese la medida de cuello", Toast.LENGTH_LONG).show();

                } else {

                    ApiService.register_measures(weight, muscles, fat, hips, waist, neck, height);
                    binding.weight.setText("0");
                    binding.height.setText("0");
                    binding.muscles.setText("0");
                    binding.fat.setText("0");
                    binding.hips.setText("0");
                    binding.waist.setText("0");
                    binding.neck.setText("0");





                }
            }




        });






        return binding.getRoot();
    }
}