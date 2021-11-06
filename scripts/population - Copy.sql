USE [nutridb]
GO

-- Usuario 
INSERT INTO [dbo].[Usuario]
           ([id_administrador]
           ,[id_nutricionista]
           ,[id_cliente]
           ,[rol]
           ,[nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave])
     VALUES
           (NULL
           ,NULL
           ,1
           ,'Cliente'
           ,'Adrian'
           ,'Araya'
           ,'Ramirez'
           ,'adrian@gmail.com'
           ,'1234')

-- Usuario 
INSERT INTO [dbo].[Usuario]
           ([id_administrador]
           ,[id_nutricionista]
           ,[id_cliente]
           ,[rol]
           ,[nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave])
     VALUES
           (NULL
           ,NULL
           ,2
           ,'Cliente'
           ,'Shakime'
           ,'Richards'
           ,'Sparks'
           ,'shak@gmail.com'
           ,'1234')


-- NUTRICIONISTAS

INSERT INTO [dbo].[Nutricionista]
           ([cedula]
           ,[codigo_nutricionista]
           ,[estatus]
           ,[fecha_nacimiento]
           ,[direccion]
           ,[foto]
           ,[tarjeta]
           ,[tipo_cobro])
     VALUES
           ('123456789'
           ,123
           ,'ACTIVO'
           ,'1/11/1999'
           ,'Heredia'
           ,'12314124'
           ,'12312313'
           ,'Contado')

-- CLIENTES


INSERT INTO [dbo].[Cliente]
           ([id_usuario]
           ,[id_nutricionista]
           ,[fecha_nacimiento]
           ,[meta_consumo_diario]
           ,[altura]
           ,[pais]
           ,[estatus]
           ,[id_conversacion])
     VALUES
           (1
           ,1
           ,'06/21/1999'
           ,100
           ,170
           ,'Costa Rica'
           ,'ACTIVO'
           ,NULL)

INSERT INTO [dbo].[Cliente]
           ([id_usuario]
           ,[id_nutricionista]
           ,[fecha_nacimiento]
           ,[meta_consumo_diario]
           ,[altura]
           ,[pais]
           ,[estatus]
           ,[id_conversacion])
     VALUES
           (2
           ,1
           ,'10/21/1999'
           ,150
           ,180
           ,'Costa Rica'
           ,'ACTIVO'
           ,NULL)

GO