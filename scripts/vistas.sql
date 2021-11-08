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

Create view VistaPacientesPorNutricionista
as
SELECT N.id as id_nutricionista, C.id as id_paciente, C.estatus as estatus, U.email, C.fecha_nacimiento,
       U.primer_nombre + ' ' + U.segundo_nombre + ' ' + U.primer_apellido + ' ' + U.segundo_apellido as Nombre_Completo,
       C.meta_consumo_diario,  C.id_conversacion
FROM Nutricionista N
JOIN Cliente C on N.id = C.id_nutricionista
JOIN Usuario U on U.id = C.id_usuario



CREATE VIEW VistaNutricionistas
AS
SELECT N.id,
       N.tipo_cobro                                                                                  as tipo_de_pago,
       U.email                                                                                       as correo_electronico,
       U.primer_nombre + ' ' + U.segundo_nombre + ' ' + U.primer_apellido + ' ' + U.segundo_apellido as nombre_completo,
       N.tarjeta                                                                                     as numero_de_tarjeta,
       (SELECT Count(*)
       FROM VistaPacientesPorNutricionista V
       JOIN Nutricionista Nu on U.id = Nu.id_usuario
       WHERE V.id_nutricionista = Nu.id) as numero_pacientes
FROM USUARIO U
JOIN Nutricionista N on U.id = N.id_usuario