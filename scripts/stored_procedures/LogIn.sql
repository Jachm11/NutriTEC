USE [nutridb]

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

