USE [nutridb]

CREATE TABLE Usuario (
    id					int IDENTITY(1,1),
	rol					varchar(20) NOT NULL,
	primer_nombre		varchar(20) NOT NULL,
	segundo_nombre		varchar(20) NOT NULL,
	primer_apellido		varchar(20) NOT NULL,
	segundo_apellido	varchar(20) NOT NULL,
    email				varchar(20) NOT NULL,
	clave				varchar(20) NOT NULL

	UNIQUE(email),
	PRIMARY KEY(id)

);

CREATE TABLE Administrador (
    id					int IDENTITY(1,1),
	id_usuario			int

	PRIMARY KEY(id)

);

CREATE TABLE Cliente (
    id					int IDENTITY(1,1),
	id_usuario			int,
	id_nutricionista	int,
	id_conversacion		int,
	estatus				varchar(20) NOT NULL,
	fecha_nacimiento	Date NOT NULL,
	meta_consumo_diario float NOT NULL,
	pais				varchar(20) NOT NULL, 
	

	PRIMARY KEY(id)

);

CREATE TABLE Nutricionista (
    id						int IDENTITY(1,1),
	id_usuario				int,
	cedula					varchar(20) NOT NULL,
	codigo_nutricionista	int NOT NULL,
	estatus					varchar(20) NOT NULL,
	fecha_nacimiento		Date NOT NULL,
	direccion				varchar(50) NOT NULL,
	foto					varchar(50) NOT NULL,
	tarjeta					varchar(50) NOT NULL,
	tipo_cobro				varchar(20) NOT NULL,

	UNIQUE(cedula),
	UNIQUE(codigo_nutricionista),
	PRIMARY KEY(id)
);

CREATE TABLE Medidas (

	id					int IDENTITY(1,1),
	id_cliente			int NOT NULL,
	fecha				Date NOT NULL,
	estatus				varchar(20) NOT NULL,
	porcentaje_musculo	float NOT NULL,
	porcentaje_grasa	float NOT NULL,
	cadera				float NOT NULL,
	peso				float NOT NULL,
	altura				float NOT NULL,
	cintura				float NOT NULL,
	cuello				float NOT NULL,

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

-- Administrador				|||		1		|||
ALTER TABLE "Administrador"
ADD CONSTRAINT ADMINISTRADOR_USUARIO_FK FOREIGN KEY(id_usuario)
REFERENCES "Usuario"(id);

-- Cliente						|||		2		|||
ALTER TABLE "Cliente"
ADD CONSTRAINT CLIENTE_NUTRICIONISTA_FK FOREIGN KEY(id_nutricionista)
REFERENCES "Nutricionista"(id);

--								|||		3		|||
ALTER TABLE "Cliente"	
ADD CONSTRAINT CLIENTE_USUARIO_FK FOREIGN KEY(id_usuario)
REFERENCES "Usuario"(id);

-- Nutricionista				|||		4		|||
ALTER TABLE "Nutricionista"
ADD CONSTRAINT NUTRICIONISTA_USUARIO_FK FOREIGN KEY(id_usuario)
REFERENCES "Usuario"(id);

-- Medidas						|||		5		|||
ALTER TABLE "Medidas"
ADD CONSTRAINT MEDIDAS_CLIENTE_FK FOREIGN KEY(id_cliente)
REFERENCES "Cliente"(id);

-- Consumo diario				|||		6		|||
ALTER TABLE "Consumo_diario"
ADD CONSTRAINT CONSUMO_DIARIO_CLIENTE_FK FOREIGN KEY(id_cliente)
REFERENCES "Cliente"(id);

--								|||		7		|||
ALTER TABLE "Consumo_diario"	
ADD CONSTRAINT CONSUMO_DIARIO_PRODUCTO_FK FOREIGN KEY(id_producto)
REFERENCES "Producto"(id);

-- Receta						|||		8		|||
ALTER TABLE "Receta"
ADD CONSTRAINT RECETA_CLIENTE_FK FOREIGN KEY(id_cliente)
REFERENCES "Cliente"(id);

-- Producto receta				|||		9		|||
ALTER TABLE "Producto_receta"
ADD CONSTRAINT PRODUCTO_RECETA_PRODUCTO_FK FOREIGN KEY(id_producto)
REFERENCES "Producto"(id);

--								|||		10		|||
ALTER TABLE "Producto_receta"
ADD CONSTRAINT PRODUCTO_RECETA_RECETA_FK FOREIGN KEY(id_receta)
REFERENCES "Receta"(id);

-- Productos plan				|||		11		|||
ALTER TABLE "Productos_plan"
ADD CONSTRAINT PRODUCTOS_PLAN_PRODUCTO_FK FOREIGN KEY(id_producto)
REFERENCES "Producto"(id);

--								|||		12		|||
ALTER TABLE "Productos_plan"
ADD CONSTRAINT PRODUCTOS_PLAN_PLANS_FK FOREIGN KEY(id_plan)
REFERENCES "Plans"(id);

-- Plans						|||		13		|||
ALTER TABLE "Plans"
ADD CONSTRAINT PLANS_NUTRICIONISTA_FK FOREIGN KEY(id_nutricionista)
REFERENCES "Nutricionista"(id);

-- Plan cliente					|||		14		|||
ALTER TABLE "Plan_cliente"
ADD CONSTRAINT PLAN_CLIENTE_PLAN_FK FOREIGN KEY(id_plan)
REFERENCES "Plans"(id);

--								|||		15		|||
ALTER TABLE "Plan_cliente"
ADD CONSTRAINT PLAN_CLIENTE_CLIENTE_FK FOREIGN KEY(id_cliente)
REFERENCES "Cliente"(id);

-- Fecha plan cliente			|||		16		|||
ALTER TABLE "Fecha_plan_cliente"
ADD CONSTRAINT FECHA_PLAN_CLIENTE_PLAN_CLIENTE_FK FOREIGN KEY(id_plan_cliente)
REFERENCES "Plan_cliente"(id_plan_cliente);

-- TOTAL 16 ALTER TABLES