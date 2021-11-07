
-------------------------------------------- UNQUIE FECHA MEDIDA -------------------------------------------
use nutridb;

IF OBJECT_ID ( 'UniqueFechaMedida', 'P' ) IS NOT NULL
    DROP PROCEDURE UniqueFechaMedida;
GO

Create procedure [dbo].UniqueFechaMedida
    (
		@fecha Date,
		@id_cliente int
    )
   AS
   BEGIN

    DECLARE @temp Date
    SET @temp = (
        Select fecha
        FROM(
            SELECT fecha
            FROM Medidas
            WHERE fecha = @fecha and @id_cliente = id_cliente
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

--------------------------------------------- UNIQUE BARCODE ---------------------------------------------
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

------------------------------------------ UNIQUE EMAIL ----------------------------------------------
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
        FROM Usuario
        WHERE email = @email

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

---------------------------------------- LOG IN ----------------------------------------------------
USE [nutridb]

IF OBJECT_ID('LogIn', 'P') IS NOT NULL
    DROP PROCEDURE [LogIn];
GO

Create procedure dbo.[LogIn](
    @rol varchar(20) = '',
    @email varchar(20) = NULL,
    @clave varchar(max) = NULL
)
AS
BEGIN
    -- MD5
    DECLARE @md5 VARCHAR(max)
    SET @md5 = (SELECT dbo.Hash_MD5(@clave))

    IF @rol = 'CLIENT'
        BEGIN
            SELECT Cliente.id,
                   id_usuario,
                   estatus,
                   ISNULL(id_nutricionista, -1)                       as id_nutricionista,
                   ISNULL(id_conversacion, -1)                        as id_conversacion,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   meta_consumo_diario,
                   pais

            FROM Usuario
                     JOIN Cliente ON Usuario.id = Cliente.id_usuario
            WHERE email = @email
              AND clave = @md5
        END


    IF @rol = 'NUTRICIONIST'
        BEGIN
            SELECT Nutricionista.id,
                   id_usuario,
                   estatus,
                   cedula,
                   codigo_nutricionista,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   direccion,
                   foto,
                   tarjeta,
                   tipo_cobro
            FROM Usuario
                     JOIN Nutricionista ON Usuario.id = Nutricionista.id_usuario
            WHERE email = @email
              AND clave = @md5
        END

    IF @rol = 'ADMIN'
        BEGIN
            SELECT Administrador.id,
                   id_usuario,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave

            FROM Usuario
                     JOIN Administrador ON Usuario.id = Administrador.id_usuario
            WHERE email = @email
              AND clave = @md5
        END

END

GO

--------------------------------------- REGISTER ----------------------------------------------
USE [nutridb]

IF OBJECT_ID('Register', 'P') IS NOT NULL
    DROP PROCEDURE [Register];
GO

Create procedure [dbo].[Register](
    @primer_nombre varchar(20) = NULL,
    @segundo_nombre varchar(20) = NULL,
    @primer_apellido varchar(20) = NULL,
    @segundo_apellido varchar(20) = NULL,
    @email varchar(20) = NULL,
    @clave varchar(20) = NULL,
    @fecha_nacimiento Date = NULL,
    @meta_consumo_diario float = NULL,
    @pais varchar(20) = NULL,
    @estatus varchar(20) = 'ACTIVO',
    @codigo_nutricionista int = NULL,
    @cedula varchar(32) = NULL,
    @direccion varchar(50) = NULL,
    @foto varchar(50) = NULL,
    @tarjeta varchar(20) = NULL,
    @tipo_cobro varchar(20) = NULL,
    @rol NVARCHAR(20) = ''
)
AS
BEGIN

    -- INSERCION DEL USUARIO.
    insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
    values (@rol, @primer_nombre, @segundo_nombre, @primer_apellido, @segundo_apellido, @email, @clave);

    declare @id_u int
    set @id_u = (select id from Usuario where email = @email)


    IF @rol = 'ADMIN'
        BEGIN
            insert into Administrador (id_usuario)
            values (@id_u);
        END

    IF @rol = 'CLIENT'
        BEGIN
            insert into Cliente (id_usuario, estatus, fecha_nacimiento, meta_consumo_diario, pais)
            values (@id_u, @estatus, @fecha_nacimiento, @meta_consumo_diario, @pais);
        END

    IF @rol = 'NUTRICIONIST'
        BEGIN
            insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion,
                                       foto,
                                       tarjeta, tipo_cobro)
            values (@id_u, @cedula, @codigo_nutricionista, @estatus, @fecha_nacimiento, @direccion, @foto, @tarjeta,
                    @tipo_cobro);
        END

END

GO

----------------------------------------- MASTER CLIENT -------------------------------------------------------
USE [nutridb]

IF OBJECT_ID('MasterClient', 'P') IS NOT NULL
    DROP PROCEDURE [MasterClient];
GO

Create procedure dbo.[MasterClient](
    @id int = NULL,
    @id_nutricionista int = NULL,
    @id_conversacion int = NULL,
    @fecha Date = NULL,
    @porcentaje_musculo float = NULL,
    @porcentaje_grasa float = NULL,
    @cadera float = NULL,
    @peso float = NULL,
    @altura float = NULL,
    @cintura float = NULL,
    @cuello float = NULL,
    @StatementType NVARCHAR(20) = ''
)
AS
BEGIN

    IF @StatementType = 'SelectAll'
        BEGIN
            SELECT Cliente.id,
                   ISNULL(id_nutricionista, -1)                       as id_nutricionista,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   meta_consumo_diario,
                   pais,
                   estatus,
                   ISNULL(id_conversacion, -1)                        as id_conversacion
            FROM Usuario
                     JOIN Cliente ON Usuario.id = Cliente.id_usuario
            WHERE rol = 'CLIENT'

        END

    IF @StatementType = 'SelectOne'
        BEGIN
            SELECT Cliente.id,
                   ISNULL(id_nutricionista, -1)                       as id_nutricionista,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   meta_consumo_diario,
                   pais,
                   estatus,
                   ISNULL(id_conversacion, -1)                        as id_conversacion
            FROM Usuario
                     JOIN Cliente ON Usuario.id = Cliente.id_usuario
            WHERE @id = Cliente.id

        END

    IF @StatementType = 'AssignN'
        BEGIN
            UPDATE Cliente
            SET id_nutricionista = @id_nutricionista
            WHERE id = @id
        END

    IF @StatementType = 'AssignC'
        BEGIN
            UPDATE Cliente
            SET id_conversacion = @id_conversacion
            WHERE id = @id
        END

    IF @StatementType = 'RegistrarMedidas'
        BEGIN

            insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura,
                                 cuello)
            values (@id, @fecha, @porcentaje_musculo, @porcentaje_grasa, @cadera, @peso, @altura, @cintura, @cuello);

            SELECT CAST(1 AS bit)

        END

    IF @StatementType = 'GetMedidas'
        BEGIN


            select fecha,
                   porcentaje_musculo,
                   porcentaje_grasa,
                   cadera,
                   peso,
                   altura,
                   cintura,
                   cuello
            from Medidas
            where id_cliente = @id

        END
END

GO

---------------------------------------------------- MASTER NUTRICIONIST -------------------------------------
use nutridb;

IF OBJECT_ID ( 'MasterNutricionist', 'P' ) IS NOT NULL
    DROP PROCEDURE [MasterNutricionist];
GO

Create procedure [dbo].[MasterNutricionist]
    (
       @id int = NULL,
       @StatementType NVARCHAR(20) = ''
   )
   AS
   BEGIN

    IF @StatementType = 'SelectOne'
    BEGIN
    SELECT Nutricionista.id,
                   id_usuario,
                   estatus,
                   cedula,
                   codigo_nutricionista,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   direccion,
                   foto,
                   tarjeta,
                   tipo_cobro
            FROM Usuario
                     JOIN Nutricionista ON Usuario.id = Nutricionista.id_usuario
            WHERE Nutricionista.id = @id
    END


	END

GO
------------------------------------------------ MASTER PRODUCT ---------------------------------------------------
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