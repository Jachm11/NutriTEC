USE [nutridb]


---------------------------------------------- USUARIOS -------------------------------------------------

-- Admin: id_usuario = 1   clave = helado199
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('ADMIN', 'Carlos', 'Adrian', 'Araya', 'Ramirez', 'adrian@gmail.com', '5498B1DA25F0F520FEBB623D88C74736')

-- Admin: id_usuario = 2   clave = yasuo2000
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('ADMIN', 'Michael', 'Shakime', 'Richards', 'Sparks', 'shak@gmail.com', '43CF0E4D7A2A25A454E7E44613061904')

-- Cliente: id_usuario = 3   clave = sebas123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Sebastian', '', 'Mora', 'Godinez', 'sebas@gmail.com', '4D6993543CD9203435AA92560D5AABA1')

-- Cliente: id_usuario = 4   clave = jose123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('CLIENT', 'Jose', 'Alejandro', 'Chavarria', 'Sparks', 'jose@gmail.com', '90E528618534D005B1A7E7B7A367813F')

-- Nutricionista: id_usuario = 5  clave = perico123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Juan', 'Pedro', 'Perico', 'Gonzales', 'pedro@gmail.com', 'FD001EA34060B68520EB05BE55C7B7F5')

-- Nutricionista: id_usuario = 6    clave = ana123
insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
values ('NUTRICIONIST', 'Maria', 'Ana', 'Perico', 'Gonzales', 'ana@gmail.com', '5390489DA3971CBBCD22C159D54D24DA')

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

------------------------------------------- MEDIDAS -------------------------------------------------------
insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/6/2021', 30, 20, 10, 50, 170, 60, 20);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/7/2021', 31, 23, 11, 53, 170, 61, 20);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/8/2021', 31, 22, 11, 51, 170, 62, 20);

insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura, cuello)
values (1, '11/9/2021', 33, 23, 12, 52, 171, 63, 21);

