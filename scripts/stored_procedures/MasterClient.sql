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

