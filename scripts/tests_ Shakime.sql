SELECT *
FROM Receta R
         JOIN Producto_receta PR ON R.id = PR.id_receta
         JOIN Producto P ON PR.id_producto = P.id


SELECT tipo_cobro, COUNT(N.id) as cantidad
FROM USUARIO U
JOIN Nutricionista N on U.id = N.id_usuario
GROUP BY tipo_cobro


