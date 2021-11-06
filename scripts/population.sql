USE [nutridb]
GO

-- Usuario 

-- Admin: id_usuario = 1
INSERT INTO [dbo].[Usuario]
           ([rol]
           ,[primer_nombre]
		   ,[segundo_nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave])
     VALUES
           ('ADMIN'
		   ,'Carlos'
           ,'Adrian'
           ,'Araya'
           ,'Ramirez'
           ,'adrian@gmail.com'
           ,'1234')

-- Admin: id_usuario = 2
INSERT INTO [dbo].[Usuario]
           ([rol]
           ,[primer_nombre]
		   ,[segundo_nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave])
     VALUES
           ('ADMIN'
		   ,'Michael'
           ,'Shakime'
           ,'Richards'
           ,'Sparks'
           ,'shak@gmail.com'
           ,'1234')

-- Cliente: id_usuario = 3
INSERT INTO [dbo].[Usuario]
           ([rol]
           ,[primer_nombre]
		   ,[segundo_nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave])
     VALUES
           ('CLIENT'
           ,'Sebastian'
		   ,''
           ,'Mora'
           ,'Godinez'
           ,'sebas@gmail.com'
           ,'1234')

-- Cliente: id_usuario = 4
INSERT INTO [dbo].[Usuario]
           ([rol]
           ,[primer_nombre]
		   ,[segundo_nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave])
     VALUES
           ('CLIENT'
		   ,'Jose'
           ,'Alejandro'
           ,'Chavarria'
           ,'Sparks'
           ,'jose@gmail.com'
           ,'1234')

-- Nutricionista: id_usuario = 5
INSERT INTO [dbo].[Usuario]
           ([rol]
           ,[primer_nombre]
		   ,[segundo_nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave])
     VALUES
           ('NUTRICIONIST'
		   ,'Juan'
           ,'Pedro'
           ,'Perico'
           ,'Gonzales'
           ,'pedro@gmail.com'
           ,'1234')

-- Nutricionista: id_usuario = 6
INSERT INTO [dbo].[Usuario]
           ([rol]
           ,[primer_nombre]
		   ,[segundo_nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave])
     VALUES
           ('NUTRICIONIST'
		   ,'Maria'
           ,'Ana'
           ,'Perico'
           ,'Gonzales'
           ,'ana@gmail.com'
           ,'1111')

-- ADMINISTRADOR

INSERT INTO [dbo].[Administrador]
           ([id_usuario])
     VALUES
           (1)

INSERT INTO [dbo].[Administrador]
           ([id_usuario])
     VALUES
           (2)

-- NUTRICIONISTAS

INSERT INTO [dbo].[Nutricionista]
           ([id_usuario]
           ,[cedula]
           ,[codigo_nutricionista]
           ,[estatus]
           ,[fecha_nacimiento]
           ,[direccion]
           ,[foto]
           ,[tarjeta]
           ,[tipo_cobro])
     VALUES
           (5
           ,'502340221'
           ,1234
           ,'ACTIVO'
           ,'2/11/1980'
           ,'Heredia'
           ,'profile.png'
           ,'123-412-124'
           ,'Semanal')

INSERT INTO [dbo].[Nutricionista]
           ([id_usuario]
           ,[cedula]
           ,[codigo_nutricionista]
           ,[estatus]
           ,[fecha_nacimiento]
           ,[direccion]
           ,[foto]
           ,[tarjeta]
           ,[tipo_cobro])
     VALUES
           (6
           ,'30250221'
           ,1111
           ,'ACTIVO'
           ,'6/4/1985'
           ,'Heredia'
           ,'profile.png'
           ,'111-444-222'
           ,'Anual')

-- CLIENTES


INSERT INTO [dbo].[Cliente]
           ([id_usuario]
           ,[id_nutricionista]
           ,[fecha_nacimiento]
           ,[meta_consumo_diario]
           ,[pais]
           ,[estatus]
           ,[id_conversacion])
     VALUES
           (3
           ,1
           ,'06/21/1999'
           ,100
           ,'Costa Rica'
           ,'ACTIVO'
           ,NULL)

INSERT INTO [dbo].[Cliente]
           ([id_usuario]
           ,[id_nutricionista]
           ,[fecha_nacimiento]
           ,[meta_consumo_diario]
           ,[pais]
           ,[estatus]
           ,[id_conversacion])
     VALUES
           (4
           ,1
           ,'10/21/1999'
           ,150
           ,'Costa Rica'
           ,'ACTIVO'
           ,NULL)

GO