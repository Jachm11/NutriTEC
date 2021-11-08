SELECT *
FROM Receta R
         JOIN Producto_receta PR ON R.id = PR.id_receta
         JOIN Producto P ON PR.id_producto = P.id
