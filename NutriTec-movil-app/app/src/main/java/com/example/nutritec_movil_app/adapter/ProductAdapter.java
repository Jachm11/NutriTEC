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

public class ProductAdapter extends ArrayAdapter {


    ArrayList<Product> products;
    Context contex;


    /**
     * Constructor
     * @param context
     * @param arrayList lista que contiene las proyecciones
     */
    public ProductAdapter(@NonNull Context context, ArrayList<Product> arrayList) {
        // pass the context and arrayList for the super
        // constructor of the ArrayAdapter class
        super(context, 0, arrayList);

        this.products = arrayList;
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
            currentItemView = LayoutInflater.from(getContext()).inflate(R.layout.product_item, parent, false);
        }


        Product currentProduct = products.get(position);

        TextView textView1 = currentItemView.findViewById(R.id.name_product);
        textView1.setText("Nombre " + currentProduct.descripcion);

        TextView textView2 = currentItemView.findViewById(R.id.barcode);
        textView2.setText("Código de barras: " + currentProduct.barcode);

        TextView textView3 = currentItemView.findViewById(R.id.sodio);
        textView3.setText("Sodio: " + currentProduct.sodio);

        TextView textView4 = currentItemView.findViewById(R.id.grasa);
        textView4.setText("Grasa: " + currentProduct.grasa);

        TextView textView5 = currentItemView.findViewById(R.id.energia);
        textView5.setText("Energía: " + currentProduct.energia);

        TextView textView6 = currentItemView.findViewById(R.id.hierro);
        textView6.setText("Hierra: " + currentProduct.hierro);

        TextView textView = currentItemView.findViewById(R.id.calcio);
        textView.setText("Calcio: " + currentProduct.calcio);

        TextView textView7 = currentItemView.findViewById(R.id.proteina);
        textView7.setText("Proteína: " + currentProduct.proteina);

        TextView textView8 = currentItemView.findViewById(R.id.vitamina);
        textView8.setText("Vitamina: " + currentProduct.vitamina);

        TextView textView9 = currentItemView.findViewById(R.id.carbohidratos);
        textView9.setText("Carbohidratos: " + currentProduct.carbohidratos);





        // then return the recyclable view
        return currentItemView;
    }
}

