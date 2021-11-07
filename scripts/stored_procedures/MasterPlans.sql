use nutridb;

IF OBJECT_ID('MasterPlans', 'P') IS NOT NULL
    DROP PROCEDURE [MasterPlans];
GO

Create procedure [dbo].[MasterPlans](
    @id int = NULL,
    @id_cliente int = NULL,
    @id_nutricionista int = NULL,
    @id_producto int = NULL,
    @id_plan_cliente int = NULL,
    @fecha Date = NULL,
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
            select * from Plans where id_nutricionista = @id_nutricionista and estatus != 'INACTIVO'
        END

    IF @StatementType = 'SelectOne'
        BEGIN
            select *
            from VistaProductosPlan
            where id_plan = @id
        END

    IF @StatementType = 'InsertPlan'
        BEGIN
            insert into Plans (id_nutricionista, estatus, nombre)
            values (@id_nutricionista, @estatus, @nombre)
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
            where id_producto = @id_producto and id_plan = @id and tiempo_comida = @tiempo_comida
        END


    IF @StatementType = 'UpdateProductPlan'
        BEGIN
            update Productos_plan
            set porciones = @porciones
            where id_plan = @id and id_producto = @id_producto and tiempo_comida = @tiempo_comida
        END


END

GO

