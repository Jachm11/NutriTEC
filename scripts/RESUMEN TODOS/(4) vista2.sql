create view VistaRecetaProductos
as
SELECT R.id           as id_receta,
       R.estatus      as estado_receta,
       R.nombre       as nombre_receta,
       P.id           as id_producto,
       barcode,
       descripcion    as nombre_producto,
       porciones      as porcion_agregada,
       tamano_porcion as medida_porcion,
       sodio,
       grasa,
       energia,
       hierro,
       calcio,
       proteina,
       vitamina,
       carbohidratos
FROM Receta R
         JOIN Producto_receta PR ON R.id = PR.id_receta
         JOIN Producto P ON PR.id_producto = P.id
