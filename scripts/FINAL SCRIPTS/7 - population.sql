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

-- Nutricionista: id_usuario = 7    clave = mel123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Melani', 'Sofia', 'Cabezas', 'Granados', 'melani@gmail.com', 'mel123')

-- Nutricionista: id_usuario = 8    clave = dyla123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Dylana', '', 'Alvarez', 'Masis', 'dylana@gmail.com', 'dyla123')

-- Nutricionista: id_usuario = 9    clave = pablo123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Pablo', 'Daniel', 'Kohkemper', 'Alvarado', 'pablo@gmail.com', 'pablo123')

-- Nutricionista: id_usuario = 10    clave = marco123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Marco', '', 'Rivera', 'Meneses', 'marco@gmail.com', 'marco123')

-- Nutricionista: id_usuario = 11    clave = fer123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Maria', 'Fernanda', 'Araya', 'Ramirez', 'fernanda@gmail.com', 'fer123')

-- Nutricionista: id_usuario = 12    clave = lol123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Hanzel', 'David', 'Cespedez', 'Castrillo', 'hanzel@gmail.com', 'lol123')

-- Nutricionista: id_usuario = 13    clave = mari123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Mariela', 'Jimena', 'Perez', 'Mora', 'mariela@gmail.com', 'mari123')

-- Cliente: id_usuario = 14   clave = tubito123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Jean', 'Paul', 'Tubito', 'Chaves', 'tubito@gmail.com', 'tubito123')

-- Cliente: id_usuario = 15   clave = carlos123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Carlos', 'Enrique', 'Araya', 'Espinoza', 'carlos@gmail.com', 'carlos123')

-- Cliente: id_usuario = 16   clave = betty123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Beatriz', '', 'Pinzon', 'Solano', 'betty@gmail.com', 'betty123')

-- Cliente: id_usuario = 17   clave = arma123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Jose', 'Armando', 'Lopez', 'Jimenez', 'armando@gmail.com', 'arma123')

-- Cliente: id_usuario = 18   clave = kari123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Karina', 'Lucia', 'Lopez', 'Paez', 'kari@gmail.com', 'kari123')

-- Cliente: id_usuario = 19   clave = arma123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Paulo', '', 'Londra', 'Jimenez', 'paulo@gmail.com', 'paulo123')

-- Cliente: id_usuario = 20   clave = kari123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Katiana', 'Maria', 'Perico', 'Zelaya', 'katiana@gmail.com', 'katiana123')

------------------------------------------ ADMINISTRADORES ----------------------------------------------

insert into Administrador (id_usuario)
values (1)
insert into Administrador (id_usuario)
values (2)

------------------------------------------ NUTRICIONISTAS -----------------------------------------------

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (5, '502340221', 1234, 'ACTIVO', '2/11/1980', 'Heredia', 'profile1.png', '123-412-124', 'Anual')

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (6, '302510221', 1111, 'ACTIVO', '6/4/1985', 'Puntarenas', 'profile2.png', '111-222-111', 'Anual')

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (7, '101230534', 3214, 'ACTIVO', '2/5/1986', 'San Vito', 'profile3.png', '111-111-111', 'Anual')

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (8, '602130542', 1122, 'ACTIVO', '4/2/1995', 'San Jose', 'profile4.png', '666-666-666', 'Semanal')

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (9, '104220123', 1345, 'ACTIVO', '9/4/1962', 'San Carlos', 'profile5.png', '123-123-123', 'Semanal')

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (10, '604340221', 1235, 'ACTIVO', '1/3/1999', 'Guanacaste', 'profile6.png', '321-321-321', 'Semanal')

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (11, '702340123', 6666, 'ACTIVO', '12/12/1975', 'Curridabat', 'profile7.png', '111-222-111', 'Mensual')

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (12, '904230234', 7777, 'ACTIVO', '12/11/1991', 'Goicochea', 'profile8.png', '312-334-112', 'Mensual')

insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion, foto,
                           tarjeta, tipo_cobro)
values (13, '100230432', 8888, 'ACTIVO', '4/4/1965', 'Escazu', 'profile9.png', '555-223-332', 'Mensual')

---------------------------------------- CLIENTES -------------------------------------------------------

insert into Cliente (id_usuario, id_nutricionista, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (3, 1, 'ACTIVO', '06/21/1999', 100, 'Costa Rica')

insert into Cliente (id_usuario, id_nutricionista, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (4, 2, 'ACTIVO', '12/13/1998', 150, 'Colombia')

insert into Cliente (id_usuario, id_nutricionista, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (14, 3, 'ACTIVO', '11/11/1997', 200, 'Costa Rica')

insert into Cliente (id_usuario, id_nutricionista, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (15, 4, 'ACTIVO', '07/15/2000', 100, 'Mexico')

insert into Cliente (id_usuario, id_nutricionista, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (16, 5, 'ACTIVO', '06/11/2001', 300, 'Peru')

insert into Cliente (id_usuario, id_nutricionista, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (17, 6, 'ACTIVO', '01/12/1979', 150, 'Nicaragua')

insert into Cliente (id_usuario, id_nutricionista, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (18, NULL, 'ACTIVO', '01/12/1999', 150, 'Costa Rica')

insert into Cliente (id_usuario, id_nutricionista, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (19, NULL, 'ACTIVO', '01/11/1989', 110, 'Nicaragua')

insert into Cliente (id_usuario, id_nutricionista, estatus, fecha_nacimiento, meta_consumo_diario,
                     pais)
values (20, NULL, 'ACTIVO', '01/10/1999', 100, 'Costa Rica')

------------------------------------------- MEDIDAS -------------------------------------------------------

-- Medidas cliente 1

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/1/2021', 30, 20, 10, 50, 170, 60, 20);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/2/2021', 31, 21, 11, 51, 170, 61, 21);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/3/2021', 32, 20, 12, 52, 170, 62, 22);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/4/2021', 33, 19, 11, 53, 170, 62, 21);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/5/2021', 34, 21, 10, 53, 170, 61, 21);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/6/2021', 35, 22, 13, 54, 170, 63, 22);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/7/2021', 34, 23, 14, 55, 170, 62, 22);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/8/2021', 35, 22, 13, 54, 170, 63, 21);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/9/2021', 33, 23, 15, 53, 171, 63, 21);


-- Medidas cliente 2

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (2, '10/6/2021', 40, 30, 20, 60, 177, 60, 30);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (2, '10/7/2021', 41, 31, 21, 61, 177, 61, 31);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (2, '10/8/2021', 42, 30, 22, 62, 177, 62, 32);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (2, '10/9/2021', 43, 29, 21, 63, 177, 62, 31);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (2, '10/10/2021', 44, 31, 20, 63, 177, 61, 31);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (2, '10/11/2021', 45, 32, 23, 64, 177, 63, 32);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (2, '10/12/2021', 44, 33, 24, 65, 177, 62, 32);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (2, '10/13/2021', 45, 32, 23, 64, 177, 63, 31);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (2, '10/14/2021', 43, 33, 25, 63, 178, 63, 31);

--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
-- AGREGAR MAS MEDIDAS PARA EL RESTO DE CLIENTES--
--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
--------------------------------------------------

------------------------------------------- PRODUCTOS ----------------------------------------------------

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('2987870376', 'APROBADO', 'Manzana', 1.0, 3.0, 2.0, 40.0, 20.0, 10.0, 10.1, 11.2, 104.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('1646289217', 'APROBADO', 'Banano', 7.0, 3.0, 2.0, 4.0, 2.0, 1.0, 10.1, 11.2, 14.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('6464157502', 'APROBADO', 'Naranja', 5.0, 22.0, 50, 450, 2.0, 12.0, 151, 12, 109);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('9877932744', 'APROBADO', 'Arroz', 1, 35, 22, 2, 29.0, 140, 11.1, 12.2, 2.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('8560911192', 'APROBADO', 'Frijoles', 4, 3, 22, 11, 23, 2.0, 22.1, 123.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('5597516352', 'APROBADO', 'Huevo', 3, 3, 55, 22, 67, 34.0, 21.1, 5.5, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('9168677812', 'APROBADO', 'Galleta Marinela', 5, 3, 4, 2, 1, 1.0, 2.1, 61.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('4272944341', 'APROBADO', 'Jamon', 1, 3, 24, 40, 21, 1.0, 2.1, 61.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('4399622119', 'APROBADO', 'Pescado', 4, 3, 266, 40, 23, 1.0, 4.1, 5.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('4745246973', 'APROBADO', 'Atun', 6, 3, 266, 40, 21, 1.0, 23.1, 32.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('2015028278', 'ESPERA', 'Jugo de naranja', 2, 3, 22, 41, 23, 44.0, 2.1, 1.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('9720456314', 'ESPERA', 'Jugo de mora', 4, 3, 11, 23, 1, 32.0, 2.1, 1.2, 4.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('2141589342', 'ESPERA', 'Jugo de frutas', 6, 1, 21, 35, 15, 32.0, 25.1, 11.2, 41.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('1328035523', 'ESPERA', 'Pollo', 6, 3, 2, 40, 12, 14.0, 23.1, 11.2, 44.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('9291358327', 'ESPERA', 'Bistec', 16, 31, 22, 30, 152, 14.0, 23.1, 11.2, 44.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('8418045764', 'ESPERA', 'Cereal corn-flakes', 6, 31, 2, 35, 12, 14.0, 23.1, 11.2, 44.9);

insert into Producto (barcode, estatus, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio,
                      proteina, vitamina, carbohidratos)
values ('9513716419', 'ESPERA', 'Barra de granola', 16, 3, 24, 35, 1, 1.4, 2.1, 11.2, 44.9);

------------------------------------------- RECETA -------------------------------------------------------
insert into Receta (id_cliente, estatus, nombre)
values (1, 'ACTIVO', 'Arroz con huevo frito');

insert into Producto_receta (id_producto, id_receta, porciones)
values (5, 1, 2);

insert into Producto_receta (id_producto, id_receta, porciones)
values (3, 1, 1.5);


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

-- PLAN LA MILAGROSA

insert into Plans (id_nutricionista, estatus, nombre)
values (1, 'ACTIVO', 'La milagrosa');

-- PRODUCTOS PLAN LA MILAGROSA

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (1, 1, 'Desayuno', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (2, 1, 'Desayuno', 2);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (6, 1, 'Merienda manana', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (3, 1, 'Almuerzo', 3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (8, 1, 'Almuerzo', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (6, 1, 'Merienda tarde', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (9, 1, 'Cena', 2);

-- PLAN AYUNO

insert into Plans (id_nutricionista, estatus, nombre)
values (1, 'ACTIVO', 'Ayuno');

-- PRODUCTOS PLAN AYUNO

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (2, 2, 'Merienda manana', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (4, 2, 'Almuerzo', 3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (6, 2, 'Almuerzo', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (2, 2, 'Merienda tarde', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (4, 2, 'Cena', 2);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (6, 2, 'Cena', 2);

-- PLAN FITNESS

insert into Plans (id_nutricionista, estatus, nombre)
values (2, 'ACTIVO', 'Fitness');

-- PRODUCTOS PLAN FITNESS

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (6, 3, 'Desayuno', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (1, 3, 'Merienda manana', 2);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (3, 3, 'Almuerzo', 3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (4, 3, 'Almuerzo', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (5, 3, 'Almuerzo', 4);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (1, 3, 'Merienda tarde', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (9, 3, 'Cena', 3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (7, 3, 'Cena', 2);

-- PLAN 10 kilos en 1 semana

insert into Plans (id_nutricionista, estatus, nombre)
values (2, 'ACTIVO', '10 kilos en 1 semana');

-- PRODUCTOS 10 kilos en 1 semana

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (3, 4, 'Desayuno', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (7, 4, 'Merienda manana', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (4, 4, 'Almuerzo', 3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (9, 4, 'Almuerzo', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (7, 4, 'Merienda tarde', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (1, 4, 'Cena', 1);

-- PLAN Vegano

insert into Plans (id_nutricionista, estatus, nombre)
values (3, 'ACTIVO', 'Vegano');

-- PRODUCTOS Vegano

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (3, 5, 'Desayuno', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (2, 5, 'Merienda manana', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (4, 5, 'Almuerzo', 3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (5, 5, 'Almuerzo', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (2, 5, 'Merienda tarde', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (1, 5, 'Cena', 1);

-- PLAN Pura proteina

insert into Plans (id_nutricionista, estatus, nombre)
values (3, 'ACTIVO', 'Pura proteina');

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (8, 6, 'Desayuno', 3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (7, 6, 'Merienda manana', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (4, 6, 'Almuerzo', 3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (9, 6, 'Almuerzo', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (10, 6, 'Merienda tarde', 1);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (4, 6, 'Cena', 3);

insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
values (9, 6, 'Cena', 2);
--------------------------------------------- CONSUMO DIARIO --------------------------------------

-- Consumo diario cliente 1

-- Fecha 10/12/2021

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 1, 'Desayuno', '10/12/2021',1)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 2, 'Merienda manana', '10/12/2021',2)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 3, 'Almuerzo', '10/12/2021',3)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 4, 'Almuerzo', '10/12/2021',1)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 5, 'Merienda tarde', '10/12/2021',1)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 6, 'Cena', '10/12/2021',2)

-- Fecha 10/13/2021

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 3, 'Desayuno', '10/13/2021',1)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 4, 'Merienda manana', '10/13/2021',1)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 5, 'Almuerzo', '10/13/2021',2)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 6, 'Almuerzo', '10/13/2021',3)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 7, 'Merienda tarde', '10/13/2021',1)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 8, 'Cena', '10/13/2021',2)

-- Fecha 10/14/2021

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 2, 'Desayuno', '10/14/2021',3)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 3, 'Merienda manana', '10/14/2021',1)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 4, 'Almuerzo', '10/14/2021',2)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 8, 'Almuerzo', '10/14/2021',1)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 9, 'Merienda tarde', '10/14/2021',3)

insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
values (1, 10, 'Cena', '10/14/2021',1)

---------------------------------- PLAN A CLIENTE -------------------------------------

insert into Plan_cliente (id_plan, id_cliente, fecha)
values (1,1, '10/14/2021');
insert into Plan_cliente (id_plan, id_cliente, fecha)
values (1,1, '10/15/2021');
insert into Plan_cliente (id_plan, id_cliente, fecha)
values (1,1, '10/16/2021');
insert into Plan_cliente (id_plan, id_cliente, fecha)
values (1,1, '10/17/2021');
insert into Plan_cliente (id_plan, id_cliente, fecha)
values (1,1, '10/18/2021');

