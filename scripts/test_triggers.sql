-- TRIGGER 1.

-- PRIMERO CORRER RUN HASH_MD5.sql y MD5_TRIGGER.sql

-- 1. y 3. CORRER ANTES Y DESPUES
select U.id as id, primer_nombre + ' ' + primer_apellido + ' ' + segundo_apellido as nombre , email, clave from usuario u

-- 2. insert user:
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('ADMIN', 'Marco', '', 'Rivera', 'Meneses', 'a@gmail.com', 'marcorivera123')




-- TRIGGER 2.

-- PRIMERO CORRER RUN RECIPERELATION_TRIGGER.sql

-- 1. VER LAS RECETAS EXISTENTES CON SUS RESPECTIVOS PRODUCTOS.
SELECT Receta.id as id_receta, Receta.estatus as estatus_receta, nombre,
       id_producto, barcode, descripcion
FROM Receta
         INNER JOIN Producto_receta ON Receta.id = Producto_receta.id_receta
         JOIN Producto ON Producto_receta.id_producto = Producto.id
ORDER BY Receta.nombre


-- 2. AGREGAR UNA NUEVA RECETA DE PRUEBA
insert into Receta (id_cliente, estatus, nombre)
values (1, 'ACTIVO', 'Ratatouille');

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio, proteina, vitamina, carbohidratos)
values ('6605183209', 'ESPERA', 'Calabacin', 2, 7, 266, 40, 40, 1.0, 50.1, 52.2, 10.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio, proteina, vitamina, carbohidratos)
values ('6905182102', 'ESPERA', 'Salsa de tomate', 6, 3, 300, 40, 21, 5.5, 23.1, 32.2, 4.9);

select * from Receta
select * from Producto

-- insertar la relacion
DECLARE @receta int = 4
insert into Producto_receta (id_producto, id_receta, porciones) values (18, @receta, 2.5);
insert into Producto_receta (id_producto, id_receta, porciones) values (19, @receta, 3.0);

select * from Producto_receta

-- 3. REALIZAR EL UPDATE A ESTADO INACTIVO.
DECLARE @receta int = 4
UPDATE Receta
SET estatus = 'INACTIVO'
WHERE id = @receta

select * from Receta
select * from Producto_receta

