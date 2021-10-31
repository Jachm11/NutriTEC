DECLARE @sql NVARCHAR(max)=''
SELECT @sql += ' Drop table ' + QUOTENAME(TABLE_SCHEMA) + '.'+ QUOTENAME(TABLE_NAME) + '; '
FROM   INFORMATION_SCHEMA.TABLES
WHERE  TABLE_TYPE = 'BASE TABLE'
Exec Sp_executesql @sql


CREATE TABLE Clientes (
    id					int NOT NULL,
	id_nutricionista	int NOT NULL,
	nombre				varchar(20) NOT NULL,
	primer_apellido		varchar(20) NOT NULL,
	segundo_apellido	varchar(20) NOT NULL,
    email				varchar(20) NOT NULL,
	clave				varchar(20) NOT NULL,
	fecha_nacimiento	Date NOT NULL,
	meta_consumo_diario int NOT NULL,
	altura				float NOT NULL,
	pais				varchar(20) NOT NULL, 
	estatus				varchar(20) NOT NULL,
	idConversacion		int,

	UNIQUE(email),
	PRIMARY KEY(id)

);

CREATE TABLE Nutricionista (
    id						int NOT NULL,
	email					varchar(20) NOT NULL,
	clave					varchar(20) NOT NULL,
	cedula					int NOT NULL,
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
	PRIMARY KEY(id,cedula)
);

CREATE TABLE Medidas (

	id					int NOT NULL,
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

	id				int NOT NULL,
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

	PRIMARY KEY(id, barcode)
);

CREATE TABLE Receta(
	
	id				int NOT NULL,
	id_cliente		int NOT NULL,
	estatus			varchar(20) NOT NULL,
	nombre			varchar(20) NOT NULL,

	PRIMARY KEY(id)
);

CREATE TABLE Producto_receta(

	id_producto		int NOT NULL,
	id_receta		int NOT NULL,

	PRIMARY KEY(id_producto,id_receta)
);


CREATE TABLE Plans(
	
	id					int NOT NULL,
	id_nutricionista	int NOT NULL,
	estatus			varchar(20) NOT NULL,
	nombre			varchar(20) NOT NULL,

	PRIMARY KEY(id,id_nutricionista)
);

CREATE TABLE Productos_plan(

	id_producto		int NOT NULL,
	id_plan			int NOT NULL,
	tiempo_comida	varchar(20) NOT NULL,

	PRIMARY KEY(id_producto,id_plan)
);

CREATE TABLE Plan_cliente(

	id_plan			int NOT NULL,
	id_cliente		int NOT NULL,
	id_plan_cliente	int NOT NULL,

	PRIMARY KEY(id_plan,id_cliente,id_plan_cliente)
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