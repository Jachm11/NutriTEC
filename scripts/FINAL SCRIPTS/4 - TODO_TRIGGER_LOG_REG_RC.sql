----------------------------- HASH MD5 -------------------------------------
USE [nutridb]
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

---------------------------------------- TRIGGER MD5 -------------------------------------------------------

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
---------------------------------------- RECIPE RELATIONS TRIGGER -----------------------------------------

IF OBJECT_ID('Products_Recipe', 'P') IS NOT NULL
    DROP TRIGGER [RecipeRelations];
GO

-- TRIGGER MD5
CREATE TRIGGER dbo.[RecipeRelations]
    ON dbo.Receta
    AFTER UPDATE
    AS
BEGIN
    SET NOCOUNT ON;

    DECLARE
        @id int,
        @status VARCHAR(max)

    -- id
    SELECT @id = id FROM DELETED
    -- status
    SELECT @status = estatus FROM INSERTED

    if @status = 'INACTIVO'
        BEGIN
            DELETE FROM Producto_receta
            WHERE id_receta = @id
        END
END

GO
---------------------------------------- LOG IN ----------------------------------------------------

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
            SELECT id from Cliente where id_usuario=@id_u -- available
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

------------------------------------ REPORTE DE COBRO

IF OBJECT_ID('ReporteCobro', 'P') IS NOT NULL
    DROP PROCEDURE [ReporteCobro];
GO

CREATE procedure dbo.[ReporteCobro]
    (
    @tipo varchar(20)
    )
AS
BEGIN
    SELECT tipo_de_pago, correo_electronico, nombre_completo, numero_de_tarjeta,
           numero_pacientes as monto_total,
    (CASE WHEN tipo_de_pago = 'Mensual' THEN '5%'
          WHEN tipo_de_pago = 'Anual' THEN '10%'
          ELSE '-'
          END) AS descuento,
    (CASE WHEN tipo_de_pago = 'Mensual' THEN numero_pacientes - (numero_pacientes * 0.05)
          WHEN tipo_de_pago = 'Anual' THEN numero_pacientes - (numero_pacientes * 0.10)
          ELSE numero_pacientes
          END) AS monto_a_cobrar
    FROM VistaNutricionistas
    WHERE lower(tipo_de_pago) = @tipo
END
go


