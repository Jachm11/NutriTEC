package com.example.nutritec_movil_app.recipe;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.nutritec_movil_app.R;

import java.util.ArrayList;

public class RecipeAdapter extends ArrayAdapter<Recipe> {


    private ArrayList<Recipe> recipes;

    public RecipeAdapter(@NonNull Context context, ArrayList<Recipe> arrayList) {
        super(context, 0, arrayList);

        this.recipes = arrayList;

    }


    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        View currentItemView = convertView;

        // of the recyclable view is null then inflate the custom layout for the same
        if (currentItemView == null) {
            currentItemView = LayoutInflater.from(getContext()).inflate(R.layout.recipe_item, parent, false);


        }



        return currentItemView;

    }




    }
