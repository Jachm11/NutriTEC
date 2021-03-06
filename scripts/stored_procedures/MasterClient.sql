USE [nutridb]

IF OBJECT_ID('MasterClient', 'P') IS NOT NULL
    DROP PROCEDURE [MasterClient];
GO

Create procedure dbo.[MasterClient](
    @id int = NULL,
    @id_nutricionista int = NULL,
    @id_producto int = NULL,
    @tiempo_comida varchar(20) = '',
    @fecha Date = NULL,
    @fechaInicio Date = NULL,
    @fechaFin Date = NULL,
    @porcentaje_musculo float = NULL,
    @porcentaje_grasa float = NULL,
    @cadera float = NULL,
    @peso float = NULL,
    @altura float = NULL,
    @cintura float = NULL,
    @cuello float = NULL,
    @cantidad_porciones int = NULL,
    @StatementType NVARCHAR(max) = ''
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
                   estatus
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
                   estatus
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

    IF @StatementType = 'UnAssignN'
        BEGIN
            update Cliente
            set id_nutricionista = NULL
            where id = @id;

            delete
            from Plan_cliente
            where id_cliente = @id;

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
                   round(peso/POWER(altura/100, 2),2) as IMC,
                   cintura,
                   cuello
            from Medidas
            where id_cliente = @id

        END

    IF @StatementType = 'RegistroConsumoDiario'
        BEGIN
            insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha, cantidad_porciones)
            values (@id, @id_producto, @tiempo_comida, @fecha, @cantidad_porciones)
        END

    IF @StatementType = 'ReporteAvance'
        BEGIN
            select fecha,
                   porcentaje_musculo,
                   porcentaje_grasa,
                   cadera,
                   peso,
                   altura,
                   round(peso/POWER(altura/100, 2),2) as IMC,
                   cintura,
                   cuello
            from Medidas
            where id_cliente = @id
              and fecha >= @fechaInicio
              and fecha <= @fechaFin
        END

    IF @StatementType = 'GetClientsWithoutNutri'
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
                   estatus
            FROM Usuario
                     JOIN Cliente ON Usuario.id = Cliente.id_usuario
            WHERE rol = 'CLIENT'
              and id_nutricionista IS NULL
        END

    IF @StatementType = 'GetLastMedidas'
        BEGIN

            select id,
                   id_cliente,
                   fecha,
                   porcentaje_musculo,
                   porcentaje_grasa,
                   cadera,
                   peso,
                   altura,
                   round(peso/POWER(altura/100, 2),2) as IMC,
                   cintura,
                   cuello
            from medidas
            where fecha = (select top 1 fecha from Medidas where id_cliente = @id order by fecha desc)
                            and id_cliente=@id
        END


END

GO

