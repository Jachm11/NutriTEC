use nutridb;

IF OBJECT_ID('MasterNutricionist', 'P') IS NOT NULL
    DROP PROCEDURE [MasterNutricionist];
GO

Create procedure [dbo].[MasterNutricionist](
    @id int = NULL,
    @id_plan int = NULL,
    @id_cliente int = NULL,
    @fecha Date = NULL,
    @StatementType NVARCHAR(max) = ''
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

    IF @StatementType = 'AssignPlanToClient'
        BEGIN

            if (select fecha from Plan_cliente where id_cliente = @id_cliente and fecha = @fecha) = @fecha
                begin
                    SELECT CAST(0 AS bit) -- unavailable
                end
            else
                begin
                    SELECT CAST(1 AS bit) -- available
                    insert into Plan_cliente (id_plan, id_cliente, fecha)
                    values (@id_plan, @id_cliente, @fecha);
                end
        END

    IF @StatementType = 'SeguimientoPlanFecha'
        BEGIN
            SELECT id_plan, nombre, fecha
            FROM Plans
                     JOIN Plan_cliente on Plans.id = Plan_cliente.id_plan
            WHERE id_cliente = @id_cliente
        END

    IF @StatementType = 'SeguimientoConsumoDiarioFechas'
        BEGIN
            SELECT distinct fecha
            FROM Consumo_diario
            WHERE id_cliente = @id_cliente
        END

    IF @StatementType = 'SeguimientoConsumoDiarioPorFecha'
        BEGIN
            SELECT id_producto,
                   tiempo_comida,
                   barcode,
                   descripcion,
                   tamano_porcion,
                   sodio,
                   grasa,
                   energia,
                   hierro,
                   calcio,
                   proteina,
                   vitamina,
                   carbohidratos,
                   cantidad_porciones
            FROM Consumo_diario
                     join Producto on id_producto = Producto.id
            WHERE id_cliente = @id_cliente
              and fecha = @fecha
        END

    IF @StatementType = 'GetAllMyClients'
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
              and id_nutricionista = @id
        END


END

GO
