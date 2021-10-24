DECLARE @sql NVARCHAR(max)=''
SELECT @sql += ' Drop table ' + QUOTENAME(TABLE_SCHEMA) + '.'+ QUOTENAME(TABLE_NAME) + '; '
FROM   INFORMATION_SCHEMA.TABLES
WHERE  TABLE_TYPE = 'BASE TABLE'
Exec Sp_executesql @sql


CREATE TABLE Patients (
    Id int NOT NULL PRIMARY KEY,
    Name varchar(255) NOT NULL,
	Address varchar(255),
	City varchar(255),
    Age int,
    Gender char(1)
);

INSERT INTO Patients (Id, Name, City, Age, Gender)
	   VALUES ('1', 'Shakime', 'San Jose', 21, 'M');
INSERT INTO Patients (Id, Name, Address, Age, Gender)
	   VALUES ('2', 'Adrian', 'adrian.420@gmail.com', 22, 'M');
INSERT INTO Patients (Id, Name, Address, City, Age, Gender)
	   VALUES ('3', 'Alexandra', 'a.jara@gmail.com', 'Heredia', 21, 'F');
SELECT * FROM Patients;