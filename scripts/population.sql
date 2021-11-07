USE [nutridb]


---------------------------------------------- USUARIOS -------------------------------------------------

-- Admin: id_usuario = 1   clave = helado199
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('ADMIN', 'Carlos', 'Adrian', 'Araya', 'Ramirez', 'adrian@gmail.com', 'helado199')

-- Admin: id_usuario = 2   clave = yasuo2000
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('ADMIN', 'Michael', 'Shakime', 'Richards', 'Sparks', 'shak@gmail.com', 'yasuo2000')

-- Cliente: id_usuario = 3   clave = sebas123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Sebastian', '', 'Mora', 'Godinez', 'sebas@gmail.com', 'sebas123')

-- Cliente: id_usuario = 4   clave = jose123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Jose', 'Alejandro', 'Chavarria', 'Sparks', 'jose@gmail.com', 'jose123')

-- Nutricionista: id_usuario = 5  clave = perico123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Juan', 'Pedro', 'Perico', 'Gonzales', 'pedro@gmail.com', 'perico123')

-- Nutricionista: id_usuario = 6    clave = ana123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Maria', 'Ana', 'Perico', 'Gonzales', 'ana@gmail.com', 'ana123')


------------------------------------------ ADMINISTRADORES ----------------------------------------------

insert into Administrador (id_usuario)
values (1)
insert into Administrador (id_usuario)
values (2)

------------------------------------------ NUTRICIONISTAS -----------------------------------------------

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (5, '502340221', 1234, 'ACTIVO', '2/11/1980', 'Heredia', 'profile.png', '123-412-124', 'Semanal')

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (6, '30250221', 1111, 'ACTIVO', '6/4/1985', 'Heredia', 'profile.png', '111-444-222', 'Anual')

---------------------------------------- CLIENTES -------------------------------------------------------

insert into Cliente (id_usuario, id_nutricionista, id_conversacion, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (3, 1, NULL, 'ACTIVO', '06/21/1999', 100, 'Costa Rica')

insert into Cliente (id_usuario, id_nutricionista, id_conversacion, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (4, 1, NULL, 'ACTIVO', '10/21/1999', 150, 'Costa Rica')

------------------------------------------- MEDIDAS -------------------------------------------------------
insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/6/2021', 30, 20, 10, 50, 170, 60, 20);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/7/2021', 31, 23, 11, 53, 170, 61, 20);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/8/2021', 31, 22, 11, 51, 170, 62, 20);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/9/2021', 33, 23, 12, 52, 171, 63, 21);

------------------------------------------- PRODUCTOS ----------------------------------------------------

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('3918975903', 'ESPERA', 'Manzana', 1.0, 3.0, 2.0, 40.0, 20.0, 10.0, 10.1, 11.2, 104.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('5658154766', 'ESPERA', 'Naranja', 5.0, 22.0, 50, 450, 2.0, 12.0, 151, 12, 109);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('7127988553', 'ESPERA', 'Arroz', 1, 35, 22, 2, 29.0, 140, 11.1, 12.2, 2.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('6590199897', 'ESPERA', 'Frijoles', 4, 3, 22, 11, 23, 2.0, 22.1, 123.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('8589648065', 'ESPERA', 'Huevo', 3, 3, 55, 22, 67, 34.0, 21.1, 5.5, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('7985303539', 'ESPERA', 'Galleta Marinela', 5, 3, 4, 2, 1, 1.0, 2.1, 61.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('9178364581', 'ESPERA', 'Jamon', 1, 3, 24, 40, 21, 1.0, 2.1, 61.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('7988816669', 'ESPERA', 'Pescado', 4, 3, 266, 40, 23, 1.0, 4.1, 5.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('6905183104', 'ESPERA', 'Atun', 6, 3, 266, 40, 21, 1.0, 23.1, 32.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('8008996359', 'ESPERA', 'Jugo de naranja', 2, 3, 22, 41, 23, 44.0, 2.1, 1.2, 4.9);

------------------------------------------- RECETA -------------------------------------------------------
insert into Receta (id_cliente, estatus, nombre)
values (1, 'ACTIVO', 'Arroz con huevo frito');

insert into Producto_receta (id_producto, id_receta, porciones)
values (5, 4, 2);

insert into Producto_receta (id_producto, id_receta, porciones)
values (3, 4, 1.5);


insert into Receta (id_cliente, estatus, nombre)
values (1, 'ACTIVO', 'Arroz a la Jardinera con Pescado');

insert into Producto_receta (id_producto, id_receta, porciones)
values (8, 2, 1.0);

insert into Producto_receta (id_producto, id_receta, porciones)
values (3, 2, 2.0);

insert into Receta (id_cliente, estatus, nombre)
values (2, 'ACTIVO', 'Gallo Pinto');

insert into Producto_receta (id_producto, id_receta, porciones)
values (4, 3, 1.0);

insert into Producto_receta (id_producto, id_receta, porciones)
values (3, 3, 2.0);
------------------------------------------- PLANES ------------------------------------------

insert into Plans (id_nutricionista, estatus, nombre)
values (1, 'ACTIVO', 'La milagrosa');

insert into Plans (id_nutricionista, estatus, nombre)
values (1, 'ACTIVO', 'Ayuno');

insert into Plans (id_nutricionista, estatus, nombre)
values (1, 'ACTIVO', 'Fitness');

insert into Plans (id_nutricionista, estatus, nombre)
values (2, 'ACTIVO', '10 kilos en 1 semana');

insert into Plans (id_nutricionista, estatus, nombre)
values (2, 'ACTIVO', 'Vegano');

insert into Plans (id_nutricionista, estatus, nombre)
values (2, 'ACTIVO', 'Sin sal');

---------------------------------------- PRODUCTOS PLAN -------------------------------------

-- PLAN LA MILAGROSA

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (1,1,'Desayuno',1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (2,1,'Desayuno',2);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (6,1,'Merienda manana',1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (3,1,'Almuerzo',3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (7,1,'Almuerzo',1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (6,1,'Merienda tarde',1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (9,1,'Cena',2);

-- PLAN LA FITNESS

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (6,3,'Desayuno',1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (1,3,'Merienda manana',2);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (3,3,'Almuerzo',3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (4,3,'Almuerzo',1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (5,3,'Almuerzo',4);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (1,3,'Merienda tarde',1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (9,3,'Cena',3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (7,3,'Cena',2);


