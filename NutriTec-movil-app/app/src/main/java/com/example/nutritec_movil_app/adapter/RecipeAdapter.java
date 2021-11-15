package com.example.nutritec_movil_app.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.nutritec_movil_app.ApiService;
import com.example.nutritec_movil_app.R;
import com.example.nutritec_movil_app.entity.Product;
import com.example.nutritec_movil_app.entity.Recipe;

import java.util.ArrayList;

/**
 * Clase que customiza un adaptador para la listView
 */
public class RecipeAdapter extends ArrayAdapter<Recipe> {


    ArrayList<Recipe> recipes;
    Context contex;


    /**
     * Constructor
     * @param context
     * @param arrayList lista que contiene las proyecciones
     */
    public RecipeAdapter(@NonNull Context context, ArrayList<Recipe> arrayList) {
        // pass the context and arrayList for the super
        // constructor of the ArrayAdapter class
        super(context, 0, arrayList);

        this.recipes = arrayList;
    }

    /**
     * Devuelve la vista del item
     * @param position posicion del item en el listView
     * @param convertView item
     * @param parent padre
     * @return
     */
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        View currentItemView = convertView;

        // of the recyclable view is null then inflate the custom layout for the same
        if (currentItemView == null) {
            currentItemView = LayoutInflater.from(getContext()).inflate(R.layout.recipe_item, parent, false);


        }

        Recipe currentRecipe = recipes.get(position);



        TextView textView1 = currentItemView.findViewById(R.id.name_recipe);
        textView1.setText(currentRecipe.nombre);




        // then return the recyclable view
        return currentItemView;
    }
}
