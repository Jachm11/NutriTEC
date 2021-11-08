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

