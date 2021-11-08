create view VistaProductosPlan
as
select id_plan,
       tiempo_comida,
       porciones,
       id_producto,
       barcode,
       descripcion,
       tamano_porcion,
       sodio,
       grasa,
       energia,
       hierro,
       calcio,
       proteina,
       vitamina,
       carbohidratos
from ((Plans join Productos_plan on Plans.id = Productos_plan.id_plan)
         join Producto on Productos_plan.id_producto = Producto.id)

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
