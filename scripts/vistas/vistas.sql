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

create view VistaListaProducto
as
SELECT id,
       estatus,
       descripcion,

       STUFF((
                 SELECT DISTINCT + ' sodio:' + CAST(sodio AS VARCHAR(max))
                                     + ', grasa:' + CAST(grasa AS VARCHAR(max))
                                     + ', energia:' + CAST(energia AS VARCHAR(max))
                                     + ', hierro:' + CAST(hierro AS VARCHAR(max))
                                     + ', calcio:' + CAST(calcio AS VARCHAR(max))
                                     + ', proteina:' + CAST(proteina AS VARCHAR(max))
                                     + ', vitamina:' + CAST(vitamina AS VARCHAR(max))
                                     + ', carbohidratos:' + CAST(carbohidratos AS VARCHAR(max))
                 FROM Producto
                 WHERE Producto.id = P.id
                 FOR XML PATH('')), 1, 1, '') [estadisticas]
FROM Producto P
