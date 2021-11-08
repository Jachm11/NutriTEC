package com.example.nutritec_movil_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.nutritec_movil_app.databinding.FragmentLoginBinding;
import com.example.nutritec_movil_app.entity.Client;

import org.json.JSONException;
import org.json.JSONObject;

import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Login#} factory method to
 * create an instance of this fragment.
 */
public class Login extends Fragment {


    private FragmentLoginBinding binding;
    public static Client current_client;



    public Login() {
        // Required empty public constructor
    }



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentLoginBinding.inflate(inflater, container, false);

        binding.enterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String email = binding.editTextTextUser.getText().toString();
                String password = binding.editTextTextPassword.getText().toString();

                JSONObject client = ApiService.login(email, password);




                if(client != null){


                    try {

                        current_client = new Client(client.getInt("id"),
                                                    client.getString("primer_nombre"),
                                                    client.getString("segundo_nombre"),
                                                    client.getString("primer_apellido"),
                                                    client.getString("segundo_apellido"),
                                                    client.getString("email"),
                                                    client.getString("fecha_nacimiento"),
                                                    client.getInt("edad"),
                                                    client.getString("pais"));

                        System.out.println(current_client);
                        NavHostFragment.findNavController(Login.this)
                                .navigate(R.id.action_login_to_mainView);
                    }
                    catch (JSONException e) {
                        e.printStackTrace();
                    }


                }
                else {
                    Toast.makeText(getContext(), "Datos invalidos", Toast.LENGTH_LONG).show();
                }

            }
        });


        return binding.getRoot();
    }

}