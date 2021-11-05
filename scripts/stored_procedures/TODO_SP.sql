use nutridb;

IF OBJECT_ID ( 'MasterClient', 'P' ) IS NOT NULL
    DROP PROCEDURE [MasterClient];  
GO

Create procedure [dbo].[MasterClient]  
    (  
       @id int = NULL,
       @id_nutricionista int = NULL,
       @nombre varchar (20) = NULL,
       @primer_apellido varchar (20) = NULL,
       @segundo_apellido varchar (20) = NULL,
       @email varchar (20) = NULL,
       @clave varchar (20) = NULL,
       @fecha_nacimiento Date = NULL,
       @meta_consumo_diario float = NULL,
       @altura float = NULL,
       @pais varchar (20) = NULL,
       @estatus varchar (20) = 'ACTIVO',
       @id_conversacion int = NULL,
       @StatementType NVARCHAR(20) = ''
   )
   AS
   BEGIN

    IF @StatementType = 'SelectAll'
        BEGIN
        SELECT [id],
              ISNULL([id_nutricionista],-1) as [id_nutricionista],
              [nombre],
              [primer_apellido],
              [segundo_apellido],
              [email],
              [clave],
              [fecha_nacimiento],
              DATEDIFF(hour,[fecha_nacimiento],GETDATE())/8766 AS [edad],
              [meta_consumo_diario],
              [altura],
              [pais],
              [estatus],
              ISNULL([id_conversacion],-1) as [id_conversacion]
        FROM Cliente
        ORDER BY [nombre] ASC
        END
    
    IF @StatementType = 'SelectOne'
    BEGIN
    SELECT [id],
            ISNULL([id_nutricionista],-1) as [id_nutricionista],
            [nombre],
            [primer_apellido],
            [segundo_apellido],
            [email],
            [clave],
            [fecha_nacimiento],
            DATEDIFF(hour,[fecha_nacimiento],GETDATE())/8766 AS [edad],
            [meta_consumo_diario],
            [altura],
            [pais],
            [estatus],
            ISNULL([id_conversacion],-1) as [id_conversacion]
    FROM Cliente
    WHERE id = @id
    END

	IF @StatementType = 'LogIn'
    BEGIN
    SELECT [id],
			ISNULL([id_nutricionista],-1) as [id_nutricionista],
            [nombre],
            [primer_apellido],
            [segundo_apellido],
            [email],
            [clave],
            [fecha_nacimiento],
            DATEDIFF(hour,[fecha_nacimiento],GETDATE())/8766 AS [edad],
            [meta_consumo_diario],
            [altura],
            [pais],
            [estatus],
            ISNULL([id_conversacion],-1) as [id_conversacion]
    FROM Cliente
    WHERE [email] = @email AND [clave] = @clave
    END

    IF @StatementType = 'Insert'

        BEGIN
        INSERT INTO Cliente (
            [nombre],
            [primer_apellido],
            [segundo_apellido],
            [email],
            [clave],
            [fecha_nacimiento],
            [meta_consumo_diario],
            [altura],
            [pais],
            [estatus]
            )
        VALUES ( 
            @nombre, 
            @primer_apellido, 
            @segundo_apellido, 
            @email, 
            @clave, 
            @fecha_nacimiento, 
            @meta_consumo_diario, 
            @altura, @pais, 
            @estatus
            )
        END

    IF @StatementType = 'Update'
        BEGIN
        UPDATE Cliente
        SET [id_nutricionista] = @id_nutricionista,
            [nombre] = @nombre,
            [primer_apellido] = @primer_apellido,
            [segundo_apellido] = @segundo_apellido,
            [email] = @email,
            [clave] = @clave,
            [fecha_nacimiento] = @fecha_nacimiento,
            [meta_consumo_diario] = @meta_consumo_diario,
            [altura] = @altura,
            [pais] = @pais,
            [estatus] = @estatus,
            [id_conversacion] = @id_conversacion
        WHERE id = @id
        END

    IF @StatementType = 'AssignN'
        BEGIN
        UPDATE Cliente
        SET [id_nutricionista] = @id_nutricionista
        WHERE id = @id
        END

    IF @StatementType = 'AssignC'
        BEGIN
        UPDATE Cliente
        SET [id_conversacion] = @id_conversacion
        WHERE id = @id
        END


	END

GO











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








use nutridb;

IF OBJECT_ID ( 'MasterProduct', 'P' ) IS NOT NULL
    DROP PROCEDURE [MasterProduct];  
GO

Create procedure [dbo].[MasterProduct]  
    (  
       @id int = NULL,
       @barcode varchar (50) = NULL,
	   @estatus varchar (20) = 'ESPERA',
       @descripcion varchar (20) = NULL,
       @tamano_porcion float = NULL,
       @sodio float = NULL,
       @grasa float = NULL,
       @energia float = NULL,
       @hierro float = NULL,
       @calcio float = NULL,
       @proteina float = NULL,
       @vitamina float = NULL,
       @carbohidratos float = NULL,
       @StatementType NVARCHAR(20) = ''
   )
   AS
   BEGIN

    IF @StatementType = 'SelectAll'
        BEGIN
        SELECT [id],
              [barcode],
              [estatus],
              [descripcion],
              [tamano_porcion],
              [sodio],
              [grasa],
              [energia],
              [hierro],
              [calcio],
              [proteina],
              [vitamina],
			  [carbohidratos]
        FROM Producto
        ORDER BY [id] ASC
        END
    
    IF @StatementType = 'SelectOne'
    BEGIN
		SELECT [id],
              [barcode],
              [estatus],
              [descripcion],
              [tamano_porcion],
              [sodio],
              [grasa],
              [energia],
              [hierro],
              [calcio],
              [proteina],
              [vitamina],
			  [carbohidratos]
        FROM Producto
    WHERE id = @id
    END

    IF @StatementType = 'Insert'

        BEGIN
        INSERT INTO Producto (
            [barcode],
              [estatus],
              [descripcion],
              [tamano_porcion],
              [sodio],
              [grasa],
              [energia],
              [hierro],
              [calcio],
              [proteina],
              [vitamina],
			  [carbohidratos]
            )
        VALUES ( 
            @barcode, 
            @estatus, 
            @descripcion, 
            @tamano_porcion, 
            @sodio, 
            @grasa, 
            @energia, 
            @hierro, 
			@calcio, 
            @proteina,
			@vitamina,
			@carbohidratos
            )
        END

    IF @StatementType = 'Update'
        BEGIN
        UPDATE Producto
        SET 
            [estatus] = @estatus
        WHERE id = @id
        END


	END

GO




use nutridb;

IF OBJECT_ID ( 'UniqueBarcode', 'P' ) IS NOT NULL
    DROP PROCEDURE UniqueEmail;  
GO

Create procedure [dbo].UniqueBarcode  
    (  
		@barcode varchar(50)
    )
   AS
   BEGIN

    DECLARE @temp varchar(20)
    SET @temp = ( 
        Select barcode
        FROM(
            SELECT barcode
            FROM Producto 
            WHERE barcode = @barcode
		) q1
	)

    -- if the row to be inserted already exists, put the genreID into the @genreID output parameter


    IF @temp IS NULL
        BEGIN
        SELECT CAST(1 AS bit) -- available
        END

    IF @temp IS NOT NULL
        BEGIN
        SELECT CAST(0 AS bit) -- unavailable
        END

	END

GO






use nutridb;

IF OBJECT_ID ( 'UniqueEmail', 'P' ) IS NOT NULL
    DROP PROCEDURE UniqueEmail;  
GO

Create procedure [dbo].UniqueEmail  
    (  
		@email varchar(20)
    )
   AS
   BEGIN

    DECLARE @temp varchar(20)
    SET @temp = ( 
        Select email
        FROM(
            SELECT email
            FROM Cliente 
            WHERE email = @email
            UNION ALL
            SELECT email
            FROM Nutricionista 
            WHERE email = @email
		) q1
	)

    -- if the row to be inserted already exists, put the genreID into the @genreID output parameter


    IF @temp IS NULL
        BEGIN
        SELECT CAST(1 AS bit) -- available
        END

    IF @temp IS NOT NULL
        BEGIN
        SELECT CAST(0 AS bit) -- unavailable
        END

	END

GO