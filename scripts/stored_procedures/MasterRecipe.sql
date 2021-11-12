USE [nutridb]

IF OBJECT_ID('MasterRecipe', 'P') IS NOT NULL
    DROP PROCEDURE [MasterRecipe];
GO

CREATE procedure dbo.[MasterRecipe](
    @id int = NULL,
    @id_cliente int = NULL,
    @id_producto int = NULL,
    @nombre VARCHAR(20) = NULL,
    @estatus VARCHAR(20) = 'ACTIVO',
    @porcion float = NULL,
    @StatementType NVARCHAR(20) = ''
)
AS

BEGIN

    IF @StatementType = 'SelectClientRecipes'
        BEGIN
            SELECT id, estatus, nombre
            FROM Receta
            WHERE id_cliente = @id_cliente
              AND estatus = 'ACTIVO'
            ORDER BY nombre
        END

    IF @StatementType = 'SelectRecipeProducts'
        BEGIN
            SELECT id_producto,
                   barcode,
                   nombre_producto,
                   porcion_agregada,
                   medida_porcion,
                   sodio,
                   grasa,
                   energia,
                   hierro,
                   calcio,
                   proteina,
                   vitamina,
                   carbohidratos
            FROM VistaRecetaProductos V
            WHERE V.id_receta = @id
            ORDER BY nombre_producto
        END

    IF @StatementType = 'Insert'
        BEGIN
            INSERT INTO Receta (id_cliente, estatus, nombre)
            VALUES (@id_cliente, @estatus, @nombre);

            -- return id
            SELECT id, id_cliente, estatus, nombre
            FROM Receta WHERE id_cliente = @id_cliente AND nombre = @nombre
            
        END


    IF @StatementType = 'Update'
        BEGIN
            UPDATE Receta
            SET nombre = @nombre
            WHERE id = @id
        END

    IF @StatementType = 'Delete'
        BEGIN
            UPDATE Receta
            SET estatus = 'INACTIVO'
            WHERE id = @id
            -- TRIGGER ELIMINA REFERENCIAS QUE TENGAN A RECETA ID.
        END

    IF @StatementType = 'AddProduct'
        BEGIN
            INSERT INTO Producto_receta (id_producto, id_receta, porciones)
            VALUES (@id_producto, @id, @porcion);
        END

    IF @StatementType = 'UpdateProduct'
        BEGIN
            UPDATE Producto_receta
            SET porciones = @porcion
            WHERE id_receta = @id
              AND id_producto = @id_producto
        END

    IF @StatementType = 'RemoveProduct'
        BEGIN
            DELETE
            FROM Producto_receta
            WHERE id_receta = @id
              AND id_producto = @id_producto
        END

END
go

