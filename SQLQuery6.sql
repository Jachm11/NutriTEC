
CREATE TABLE Employees (
    id int NOT NULL PRIMARY KEY,
    username varchar(12) NOT NULL,
	password varchar(8) NOT NULL,
	birthdate Date NOT NULL
);


CREATE TABLE Clientes (
    id int NOT NULL PRIMARY KEY,
	nombre varchar(20) NOT NULL,
	primer_apellido varchar(20) NOT NULL,
	segundo_apellido varchar(20) NOT NULL,
    email varchar(20) NOT NULL,
	clave varchar(20) NOT NULL,
	fecha_nacimiento Date NOT NULL,
	meta_consumo_diario int NOT NULL,
	altura float NOT NULL,
	pais varchar(20) NOT NULL, 
	estatus varchar(20) NOT NULL,
	idConversacion int
);

-- INSERT DE CLIENTES





INSERT INTO Employees (id, username, password, birthdate)
		VALUES ('1', 'Shak', '123', '10/21/2000');

INSERT INTO Employees (id, username, password, birthdate) 
		VALUES ('2', 'Adrian', '123', '06/21/1999');

INSERT INTO Employees (id, username, password, birthdate)
		VALUES ('3', 'Jose', '123', '09/15/2001');

INSERT INTO Employees (id, username, password, birthdate)
		VALUES ('4', 'Sebas', '123', '12/31/2000');