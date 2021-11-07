USE [nutridb]

-- HASH MD5
IF OBJECT_ID('Hash_MD5', 'P') IS NOT NULL
    DROP PROCEDURE [Hash_MD5];
GO

CREATE FUNCTION dbo.[Hash_MD5](
    @data varchar(max)
)
    RETURNS VARCHAR(max)
AS
BEGIN
    DECLARE @hash VARCHAR(max)
    SELECT @hash = CONVERT(VARCHAR(max), HashBytes('MD5', @data), 2)
    RETURN @hash
END
GO





IF OBJECT_ID('MD5', 'P') IS NOT NULL
    DROP TRIGGER [MD5];
GO

-- TRIGGER MD5
CREATE TRIGGER dbo.[MD5]
    ON dbo.Usuario
    AFTER INSERT, UPDATE
    AS
BEGIN
    SET NOCOUNT ON;

    DECLARE
        @id int,
        @clave VARCHAR(max),
        @md5 VARCHAR(max)

    -- id
    SELECT @id = id FROM INSERTED
    -- clave
    SELECT @clave = clave FROM INSERTED
    -- MD5
    SET @md5 = (SELECT dbo.Hash_MD5(@clave))

    UPDATE Usuario
    SET clave = @md5
    WHERE id = @id;

END

GO






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






IF OBJECT_ID('LogIn', 'P') IS NOT NULL
    DROP PROCEDURE [LogIn];
GO

Create procedure dbo.[LogIn](
    @rol varchar(20) = '',
    @email varchar(20) = NULL,
    @clave varchar(20) = NULL
)
AS
BEGIN
    -- MD5
    DECLARE @md5 VARCHAR(20)
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


