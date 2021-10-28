DECLARE @sql NVARCHAR(max)=''
SELECT @sql += ' Drop table ' + QUOTENAME(TABLE_SCHEMA) + '.'+ QUOTENAME(TABLE_NAME) + '; '
FROM   INFORMATION_SCHEMA.TABLES
WHERE  TABLE_TYPE = 'BASE TABLE'
Exec Sp_executesql @sql


CREATE TABLE Employees (
    id int NOT NULL PRIMARY KEY,
    username varchar(12) NOT NULL,
	password varchar(8) NOT NULL,
	birthdate Date NOT NULL
);

INSERT INTO Employees (id, username, password, birthdate)
		VALUES ('1', 'Shak', '123', '10/21/2000');

INSERT INTO Employees (id, username, password, birthdate) 
		VALUES ('2', 'Adrian', '123', '06/21/1999');

INSERT INTO Employees (id, username, password, birthdate)
		VALUES ('3', 'Jose', '123', '09/15/2001');

INSERT INTO Employees (id, username, password, birthdate)
		VALUES ('4', 'Sebas', '123', '12/31/2000');