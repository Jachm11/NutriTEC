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
    DECLARE @unique VARCHAR(max)
BEGIN
--     IF @StatementType = 'SelectAll'
--         BEGIN
--             SELECT id, estatus, nombre
--             FROM Receta
--             ORDER BY nombre
--         END
--                 SELECT DISTINCT R.id        as       id_receta,
--                             R.estatus   as       estado_receta,
--                             R.nombre    as       nombre_receta,
--                             P.id        as       id_producto,
--                             barcode,
--                             descripcion as       nombre_producto,
--                             porciones   as       porcion_agregada,
--                             tamano_porcion,
--                             (SELECT estadisticas
--                              FROM VistaListaProducto VP
--                              WHERE VP.id = P.id) [stats]
--
--             FROM Receta R
--                      JOIN Producto_receta PR ON R.id = PR.id_receta
--                      JOIN Producto P ON PR.id_producto = P.id
--             ORDER BY R.nombre
--         END

    IF @StatementType = 'SelectClientRecipes'
        BEGIN
            SELECT id, estatus, nombre
            FROM Receta
            WHERE id_cliente = @id_cliente
            ORDER BY nombre
        END

    IF @StatementType = 'Insert'
        BEGIN
            SET @unique = (SELECT dbo.UniqueRecipeName(@nombre))
            IF @unique = 1
                RAISERROR ('Message',10,1)
            ElSE
                INSERT INTO Receta (id_cliente, estatus, nombre)
                VALUES (@id_cliente, @estatus, @nombre);
        END


    IF @StatementType = 'Update'
        BEGIN
            SET @unique = (SELECT dbo.UniqueRecipeName(@nombre))
            IF @unique = 1
                RAISERROR ('Message',10,1)
            ElSE
                UPDATE Receta
                SET nombre = @nombre
                WHERE id = @id
        END

    IF @StatementType = 'Delete'
        BEGIN
            UPDATE Receta
            SET estatus = 'INACTIVO'
            WHERE id = @id
            -- IMPLEMENTAR TRIGGER QUE ELIMINE REFERENCIAS QUE TENGAN A RECETA ID.
        END

    IF @StatementType = 'AddProduct'
        BEGIN
            INSERT INTO Producto_receta (id_producto, id_receta, porciones)
            VALUES (@id_producto, @id, @porcion);
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

