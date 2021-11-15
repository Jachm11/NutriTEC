use nutridb;

IF OBJECT_ID('MasterPlans', 'P') IS NOT NULL
    DROP PROCEDURE [MasterPlans];
GO

Create procedure [dbo].[MasterPlans](
    @id int = NULL,
    @id_nutricionista int = NULL,
    @id_producto int = NULL,
    @nombre varchar(20) = NULL,
    @tiempo_comida varchar(20) = NULL,
    @porciones float = NULL,
    @estatus varchar(20) = 'ACTIVO',
    @StatementType NVARCHAR(20) = ''
)
AS
BEGIN

    IF @StatementType = 'SelectAll'
        BEGIN
            select id,
                   id_nutricionista,
                   estatus,
                   nombre,
                   (select ISNULL(SUM(energia * porciones), 0)
                    from VistaProductosPlan
                    where P.id = id_plan) as calorias
            from Plans P
            where id_nutricionista = @id_nutricionista
              and estatus != 'INACTIVO'
        END

        IF @StatementType = 'SelectOneSpecific'
        BEGIN
            select id,
                   id_nutricionista,
                   estatus,
                   nombre,
                   (select ISNULL(SUM(energia * porciones), 0)
                    from VistaProductosPlan
                    where P.id = id_plan) as calorias
            from Plans P
            where id = @id
        END

    IF @StatementType = 'SelectOne'
        BEGIN
            select id_plan,
                   tiempo_comida,
                   porciones,
                   id_producto,
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
                   carbohidratos
            from VistaProductosPlan
            where id_plan = @id
        END

    IF @StatementType = 'InsertPlan'
        BEGIN
            insert into Plans (id_nutricionista, estatus, nombre)
            values (@id_nutricionista, @estatus, @nombre)

            select id, id_nutricionista, estatus, nombre
            from Plans
            where id_nutricionista = @id_nutricionista
              and nombre = @nombre

        END

    IF @StatementType = 'InsertProductsPlan'
        BEGIN
            insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
            values (@id_producto, @id, @tiempo_comida, @porciones)
        END

    IF @StatementType = 'DeletePlan'
        BEGIN
            update Plans
            set estatus = 'INACTIVO'
            where id = @id
        END

    IF @StatementType = 'DeletePlanProduct'
        BEGIN
            delete
            from Productos_plan
            where id_producto = @id_producto
              and id_plan = @id
              and tiempo_comida = @tiempo_comida
        END


    IF @StatementType = 'UpdateProductPlan'
        BEGIN
            update Productos_plan
            set porciones = @porciones
            where id_plan = @id
              and id_producto = @id_producto
              and tiempo_comida = @tiempo_comida
        END

    IF @StatementType = 'UpdatePlanName'
        BEGIN
            update Plans
            set nombre = @nombre
            where id = @id
        END


END

GO

