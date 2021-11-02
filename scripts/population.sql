USE [nutridb]
GO


-- NUTRICIONISTAS

INSERT INTO [dbo].[Nutricionista]
           ([email]
           ,[clave]
           ,[cedula]
           ,[nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[codigo_nutricionista]
           ,[altura]
           ,[estatus]
           ,[fecha_nacimiento]
           ,[peso]
           ,[direccion]
           ,[foto]
           ,[tarjeta]
           ,[tipo_cobro])
     VALUES
           ('pedro@gmail.com'
           ,'123'
           ,'123456789'
           ,'Pedro'
           ,'Perico'
           ,'Perez'
           ,123
           ,'170'
           ,'ACTIVO'
           ,'1/11/1999'
           ,100.0
           ,'Heredia'
           ,'12314124'
           ,'12312313'
           ,'Contado')

-- CLIENTES

INSERT INTO [dbo].[Cliente]
           ([id_nutricionista]
           ,[nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave]
           ,[fecha_nacimiento]
           ,[meta_consumo_diario]
           ,[altura]
           ,[pais]
           ,[estatus]
           ,[id_conversacion])
     VALUES
           (1
           ,'Adrian'
           ,'Araya'
           ,'Ramirez'
           ,'adrian@gmail.com'
           ,'1234'
           ,'12/31/2000'
           ,100.0
           ,170.0
           ,'Costa Rica'
           ,'ACTIVO'
           ,0)

INSERT INTO [dbo].[Cliente]
           ([id_nutricionista]
           ,[nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[email]
           ,[clave]
           ,[fecha_nacimiento]
           ,[meta_consumo_diario]
           ,[altura]
           ,[pais]
           ,[estatus]
           ,[id_conversacion])
     VALUES
           (NULL
           ,'Shakime'
           ,'Richards'
           ,'Sparks'
           ,'jey@gmail.com'
           ,'1234'
           ,'10/21/2000'
           ,2300.0
           ,177.0
           ,'Costa Rica'
           ,'ACTIVO'
           ,NULL)
GO