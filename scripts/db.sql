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
	email					varchar(20) NOT NULL,
	clave					varchar(20) NOT NULL,
	cedula					varchar(20) NOT NULL,
	nombre					varchar(20) NOT NULL,
	primer_apellido			varchar(20) NOT NULL,
	segundo_apellido		varchar(20) NOT NULL,
    codigo_nutricionista	int NOT NULL,
	altura					float NOT NULL,
	estatus					varchar(20) NOT NULL,
	fecha_nacimiento		Date NOT NULL,
	peso					float NOT NULL,
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
	sodio			float NOT NULL,
	grasa			float NOT NULL,
	energia			float NOT NULL,
	tamano_porcion	float NOT NULL,
	descripcion		varchar NOT NULL,
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

	PRIMARY KEY(id_producto,id_receta)
);

CREATE TABLE Productos_plan(

	id_producto		int NOT NULL,
	id_plan			int NOT NULL,
	tiempo_comida	varchar(20) NOT NULL,

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


CREATE TABLE Employees (
    id int IDENTITY(1,1) PRIMARY KEY,
    username varchar(12) NOT NULL,
	password varchar(8) NOT NULL,
	birthdate Date NOT NULL
);
	

INSERT INTO Employees (username, password, birthdate)
		VALUES ('Shak', '123', '10/21/2000');

INSERT INTO Employees (username, password, birthdate) 
		VALUES ('Adrian', '123', '06/21/1999');

INSERT INTO Employees (username, password, birthdate)
		VALUES ('Jose', '123', '09/15/2001');

INSERT INTO Employees (username, password, birthdate)
		VALUES ('Sebas', '123', '12/31/2000');