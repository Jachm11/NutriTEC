/* Drop all non-system stored procs */
USE nutridb;

DECLARE @name VARCHAR(128)
DECLARE @SQL VARCHAR(254)

SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] = 'P' AND category = 0 ORDER BY [name])

WHILE @name is not null
BEGIN
    SELECT @SQL = 'DROP PROCEDURE [dbo].[' + RTRIM(@name) +']'
    EXEC (@SQL)
    PRINT 'Dropped Procedure: ' + @name
    SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] = 'P' AND category = 0 AND [name] > @name ORDER BY [name])
END
GO

/* Drop all views */
DECLARE @name VARCHAR(128)
DECLARE @SQL VARCHAR(254)

SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] = 'V' AND category = 0 ORDER BY [name])

WHILE @name IS NOT NULL
BEGIN
    SELECT @SQL = 'DROP VIEW [dbo].[' + RTRIM(@name) +']'
    EXEC (@SQL)
    PRINT 'Dropped View: ' + @name
    SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] = 'V' AND category = 0 AND [name] > @name ORDER BY [name])
END
GO

/* Drop all functions */
DECLARE @name VARCHAR(128)
DECLARE @SQL VARCHAR(254)

SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] IN (N'FN', N'IF', N'TF', N'FS', N'FT') AND category = 0 ORDER BY [name])

WHILE @name IS NOT NULL
BEGIN
    SELECT @SQL = 'DROP FUNCTION [dbo].[' + RTRIM(@name) +']'
    EXEC (@SQL)
    PRINT 'Dropped Function: ' + @name
    SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] IN (N'FN', N'IF', N'TF', N'FS', N'FT') AND category = 0 AND [name] > @name ORDER BY [name])
END
GO

/* Drop all Foreign Key constraints */
DECLARE @name VARCHAR(128)
DECLARE @constraint VARCHAR(254)
DECLARE @SQL VARCHAR(254)

SELECT @name = (SELECT TOP 1 TABLE_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE constraint_catalog=DB_NAME() AND CONSTRAINT_TYPE = 'FOREIGN KEY' ORDER BY TABLE_NAME)

WHILE @name is not null
BEGIN
    SELECT @constraint = (SELECT TOP 1 CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE constraint_catalog=DB_NAME() AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND TABLE_NAME = @name ORDER BY CONSTRAINT_NAME)
    WHILE @constraint IS NOT NULL
    BEGIN
        SELECT @SQL = 'ALTER TABLE [dbo].[' + RTRIM(@name) +'] DROP CONSTRAINT [' + RTRIM(@constraint) +']'
        EXEC (@SQL)
        PRINT 'Dropped FK Constraint: ' + @constraint + ' on ' + @name
        SELECT @constraint = (SELECT TOP 1 CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE constraint_catalog=DB_NAME() AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME <> @constraint AND TABLE_NAME = @name ORDER BY CONSTRAINT_NAME)
    END
SELECT @name = (SELECT TOP 1 TABLE_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE constraint_catalog=DB_NAME() AND CONSTRAINT_TYPE = 'FOREIGN KEY' ORDER BY TABLE_NAME)
END
GO

/* Drop all Primary Key constraints */
DECLARE @name VARCHAR(128)
DECLARE @constraint VARCHAR(254)
DECLARE @SQL VARCHAR(254)

SELECT @name = (SELECT TOP 1 TABLE_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE constraint_catalog=DB_NAME() AND CONSTRAINT_TYPE = 'PRIMARY KEY' ORDER BY TABLE_NAME)

WHILE @name IS NOT NULL
BEGIN
    SELECT @constraint = (SELECT TOP 1 CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE constraint_catalog=DB_NAME() AND CONSTRAINT_TYPE = 'PRIMARY KEY' AND TABLE_NAME = @name ORDER BY CONSTRAINT_NAME)
    WHILE @constraint is not null
    BEGIN
        SELECT @SQL = 'ALTER TABLE [dbo].[' + RTRIM(@name) +'] DROP CONSTRAINT [' + RTRIM(@constraint)+']'
        EXEC (@SQL)
        PRINT 'Dropped PK Constraint: ' + @constraint + ' on ' + @name
        SELECT @constraint = (SELECT TOP 1 CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE constraint_catalog=DB_NAME() AND CONSTRAINT_TYPE = 'PRIMARY KEY' AND CONSTRAINT_NAME <> @constraint AND TABLE_NAME = @name ORDER BY CONSTRAINT_NAME)
    END
SELECT @name = (SELECT TOP 1 TABLE_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE constraint_catalog=DB_NAME() AND CONSTRAINT_TYPE = 'PRIMARY KEY' ORDER BY TABLE_NAME)
END
GO

/* Remove system versioning */
DECLARE @name VARCHAR(128)
DECLARE @SQL VARCHAR(254)

SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] = 'U' AND category = 0 ORDER BY [name])

WHILE @name IS NOT NULL
BEGIN
    IF OBJECTPROPERTY(OBJECT_ID(' + @name + '), 'TableTemporalType') = 2 
        SELECT @SQL = 'ALTER TABLE [dbo].[' + RTRIM(@name) +'] SET (SYSTEM_VERSIONING = OFF); ALTER TABLE [dbo].[' + RTRIM(@name) + '] DROP PERIOD FOR SYSTEM_TIME;'
        EXEC (@SQL)
        PRINT 'System Versioning Disabled for Table: ' + @name
        SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] = 'U' AND category = 0 AND [name] > @name ORDER BY [name])
END
GO

/* Drop all tables */
DECLARE @name VARCHAR(128)
DECLARE @SQL VARCHAR(254)

SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] = 'U' AND category = 0 ORDER BY [name])

WHILE @name IS NOT NULL
BEGIN
    SELECT @SQL = 'DROP TABLE [dbo].[' + RTRIM(@name) +']'
    EXEC (@SQL)
    PRINT 'Dropped Table: ' + @name
    SELECT @name = (SELECT TOP 1 [name] FROM sysobjects WHERE [type] = 'U' AND category = 0 AND [name] > @name ORDER BY [name])
END
GO








USE [nutridb]

CREATE TABLE Cliente (
    id					int IDENTITY(1,1),
	id_nutricionista	int,
	nombre				varchar(20) NOT NULL,
	primer_apellido		varchar(20) NOT NULL,
	segundo_apellido	varchar(20) NOT NULL,
    email				varchar(20) NOT NULL,
	clave				varchar(20) NOT NULL,
	fecha_nacimiento	Date NOT NULL,
	meta_consumo_diario float NOT NULL,
	altura				float NOT NULL,
	pais				varchar(20) NOT NULL, 
	estatus				varchar(20) NOT NULL,
	id_conversacion		int,

	UNIQUE(email),
	PRIMARY KEY(id)

);

CREATE TABLE Nutricionista (
    id						int IDENTITY(1,1),
	codigo_nutricionista	int NOT NULL,
	estatus					varchar(20) NOT NULL,
	nombre					varchar(20) NOT NULL,
	primer_apellido			varchar(20) NOT NULL,
	segundo_apellido		varchar(20) NOT NULL,
	email					varchar(20) NOT NULL,
	clave					varchar(20) NOT NULL,
	cedula					varchar(20) NOT NULL,
	fecha_nacimiento		Date NOT NULL,
	direccion				varchar(50) NOT NULL,
	foto					varchar(50) NOT NULL,
	tarjeta					varchar(50) NOT NULL,
	tipo_cobro				varchar(20) NOT NULL,

	UNIQUE(email),
	UNIQUE(cedula),
	PRIMARY KEY(id)
);

CREATE TABLE Medidas (

	id					int IDENTITY(1,1),
	id_cliente			int NOT NULL,
	porcentaje_musculo	float NOT NULL,
	porcentaje_grasa	float NOT NULL,
	cadera				float NOT NULL,
	peso				float NOT NULL,
	cintura				float NOT NULL,
	fecha				Date NOT NULL,
	cuello				float NOT NULL,
	estatus				varchar(20) NOT NULL

	PRIMARY KEY(id)
);

CREATE TABLE Producto (

	id				int IDENTITY(1,1),
	barcode			varchar(50) NOT NULL,
	estatus			varchar(20) NOT NULL,
	descripcion		varchar(20) NOT NULL,
	tamano_porcion	float NOT NULL,
	sodio			float NOT NULL,
	grasa			float NOT NULL,
	energia			float NOT NULL,
	hierro			float NOT NULL,
	calcio			float NOT NULL,
	proteina		float NOT NULL,
	vitamina		float NOT NULL,
	carbohidratos	float NOT NULL

	UNIQUE(barcode),
	PRIMARY KEY(id)
);

CREATE TABLE Receta(
	
	id				int IDENTITY(1,1),
	id_cliente		int NOT NULL,
	estatus			varchar(20) NOT NULL,
	nombre			varchar(20) NOT NULL,

	PRIMARY KEY(id)
);

CREATE TABLE Plans(
	
	id					int IDENTITY(1,1),
	id_nutricionista	int NOT NULL,
	estatus				varchar(20) NOT NULL,
	nombre				varchar(20) NOT NULL,

	PRIMARY KEY(id)
);

CREATE TABLE Plan_cliente(
	
	id_plan_cliente	int IDENTITY(1,1),
	id_plan			int NOT NULL,
	id_cliente		int NOT NULL,

	PRIMARY KEY(id_plan_cliente)
);

CREATE TABLE Producto_receta(

	id_producto		int NOT NULL,
	id_receta		int NOT NULL,
	porciones		float NOT NULL,

	PRIMARY KEY(id_producto,id_receta)
);

CREATE TABLE Productos_plan(

	id_producto		int NOT NULL,
	id_plan			int NOT NULL,
	tiempo_comida	varchar(20) NOT NULL,
	porciones		float NOT NULL,

	PRIMARY KEY(id_producto,id_plan)
);

CREATE TABLE Fecha_plan_cliente(

	id_plan_cliente		int NOT NULL,
	fecha				Date NOT NULL,

	PRIMARY KEY(id_plan_cliente)
);

CREATE TABLE Consumo_diario(

	id_cliente		int NOT NULL,
	id_producto		int NOT NULL,
	tiempo_comida	int NOT NULL,
	fecha			Date NOT NULL,

	PRIMARY KEY(id_cliente,id_producto)
);


/*
 *	 *	 *	 *	 FOREIGN KEYS	*	*	*	*
 */
-- Employees
ALTER TABLE "Cliente"
ADD CONSTRAINT CLIENTE_NUTRICIONISTA_FK FOREIGN KEY(id_nutricionista)
REFERENCES "Nutricionista"(id);

-- Medidas
ALTER TABLE "Medidas"
ADD CONSTRAINT MEDIDAS_CLIENTE_FK FOREIGN KEY(id_cliente)
REFERENCES "Cliente"(id);

-- Consumo diario
ALTER TABLE "Consumo_diario"
ADD CONSTRAINT CONSUMO_DIARIO_CLIENTE_FK FOREIGN KEY(id_cliente)
REFERENCES "Cliente"(id);

ALTER TABLE "Consumo_diario"
ADD CONSTRAINT CONSUMO_DIARIO_PRODUCTO_FK FOREIGN KEY(id_producto)
REFERENCES "Producto"(id);

-- Receta
ALTER TABLE "Receta"
ADD CONSTRAINT RECETA_CLIENTE_FK FOREIGN KEY(id_cliente)
REFERENCES "Cliente"(id);

-- Producto receta
ALTER TABLE "Producto_receta"
ADD CONSTRAINT PRODUCTO_RECETA_PRODUCTO_FK FOREIGN KEY(id_producto)
REFERENCES "Producto"(id);

ALTER TABLE "Producto_receta"
ADD CONSTRAINT PRODUCTO_RECETA_RECETA_FK FOREIGN KEY(id_receta)
REFERENCES "Receta"(id);

-- Productos plan
ALTER TABLE "Productos_plan"
ADD CONSTRAINT PRODUCTOS_PLAN_PRODUCTO_FK FOREIGN KEY(id_producto)
REFERENCES "Producto"(id);

ALTER TABLE "Productos_plan"
ADD CONSTRAINT PRODUCTOS_PLAN_PLANS_FK FOREIGN KEY(id_plan)
REFERENCES "Plans"(id);

-- Plans
ALTER TABLE "Plans"
ADD CONSTRAINT PLANS_NUTRICIONISTA_FK FOREIGN KEY(id_nutricionista)
REFERENCES "Nutricionista"(id);

-- Plan cliente
ALTER TABLE "Plan_cliente"
ADD CONSTRAINT PLAN_CLIENTE_PLAN_FK FOREIGN KEY(id_plan)
REFERENCES "Plans"(id);

ALTER TABLE "Plan_cliente"
ADD CONSTRAINT PLAN_CLIENTE_CLIENTE_FK FOREIGN KEY(id_cliente)
REFERENCES "Cliente"(id);

-- Fecha plan cliente
ALTER TABLE "Fecha_plan_cliente"
ADD CONSTRAINT FECHA_PLAN_CLIENTE_PLAN_CLIENTE_FK FOREIGN KEY(id_plan_cliente)
REFERENCES "Plan_cliente"(id_plan_cliente);






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
           ,[estatus]
           ,[fecha_nacimiento]
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
           ,'ACTIVO'
           ,'1/11/1999'
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
