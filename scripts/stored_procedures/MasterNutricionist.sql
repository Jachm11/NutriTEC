use nutridb;

IF OBJECT_ID ( 'MasterNutricionist', 'P' ) IS NOT NULL
    DROP PROCEDURE [MasterNutricionist];  
GO


Create procedure [dbo].[MasterNutricionist]  
    (  
       @id int = NULL,
	   @codigo_nutricionista int = NULL,
	   @estatus varchar (20) = 'ACTIVO',
       @nombre varchar (20) = NULL,
       @primer_apellido varchar (20) = NULL,
       @segundo_apellido varchar (20) = NULL,
       @email varchar (20) = NULL,
       @clave varchar (20) = NULL,
	   @cedula varchar (20) = NULL,
       @fecha_nacimiento Date = NULL,
       @direccion varchar(50) = NULL,
       @foto varchar(50) = NULL,
       @tarjeta varchar (20) = NULL,
       @tipo_cobro varchar(20) = NULL,
       @StatementType NVARCHAR(20) = ''
   )
   AS
   BEGIN

    IF @StatementType = 'SelectOne'
    BEGIN
    SELECT [id],
            [codigo_nutricionista],
			[estatus],
            [nombre],
            [primer_apellido],
            [segundo_apellido],
            [email],
            [clave],
			[cedula],
            [fecha_nacimiento],
            DATEDIFF(hour,[fecha_nacimiento],GETDATE())/8766 AS [edad],
            [direccion],
            [foto],
            [tarjeta],
			[tipo_cobro]
    FROM Nutricionista
    WHERE id = @id
    END

	IF @StatementType = 'LogIn'
    BEGIN
    SELECT [id],
            [codigo_nutricionista],
			[estatus],
            [nombre],
            [primer_apellido],
            [segundo_apellido],
            [email],
            [clave],
			[cedula],
            [fecha_nacimiento],
            DATEDIFF(hour,[fecha_nacimiento],GETDATE())/8766 AS [edad],
            [direccion],
            [foto],
            [tarjeta],
			[tipo_cobro]
    FROM Nutricionista
    WHERE [email] = @email AND [clave] = @clave
    END

    IF @StatementType = 'Insert'

        BEGIN
        INSERT INTO Nutricionista(
            [codigo_nutricionista],
			[nombre],
            [primer_apellido],
            [segundo_apellido],
            [email],
            [clave],
			[cedula],
            [fecha_nacimiento],
			[direccion],
            [foto],
            [tarjeta],
			[tipo_cobro],
            [estatus]
            )
        VALUES ( 
			@codigo_nutricionista,
            @nombre, 
            @primer_apellido, 
            @segundo_apellido, 
            @email, 
            @clave,
			@cedula,
            @fecha_nacimiento, 
			@direccion,
			@foto,
			@tarjeta,
			@tipo_cobro,
            @estatus
            )
        END

	END

GO
