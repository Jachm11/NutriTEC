USE [nutridb]

IF OBJECT_ID('MasterRecipe', 'P') IS NOT NULL
    DROP PROCEDURE [MasterRecipe];
GO

Create procedure dbo.[MasterRecipe](
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

    IF @StatementType = 'SelectAll'
        BEGIN

            SELECT DISTINCT R.id        as       id_receta,
                            R.estatus   as       estado_receta,
                            R.nombre    as       nombre_receta,
                            P.id        as       id_producto,
                            barcode,
                            descripcion as       nombre_producto,
                            porciones   as       porcion_agregada,
                            tamano_porcion,
--                             sodio,
--                             grasa,
--                             energia,
--                             hierro,
--                             calcio,
--                             proteina,
--                             vitamina,
--                             carbohidratos

                            (SELECT estadisticas
                             FROM VistaPrettyProductos VP
                             WHERE VP.id = P.id) [stats]

            FROM Receta R
                     JOIN Producto_receta PR ON R.id = PR.id_receta
                     JOIN Producto P ON PR.id_producto = P.id
            ORDER BY R.nombre
        END

    IF @StatementType = 'SelectOne'
        BEGIN
            SELECT DISTINCT R.id        as       id_receta,
                            R.estatus   as       estado_receta,
                            R.nombre    as       nombre_receta,
                            P.id        as       id_producto,
                            barcode,
                            descripcion as       nombre_producto,
                            porciones   as       porcion_agregada,
                            tamano_porcion,
--                             sodio,
--                             grasa,
--                             energia,
--                             hierro,
--                             calcio,
--                             proteina,
--                             vitamina,
--                             carbohidratos

                            (SELECT estadisticas
                             FROM VistaPrettyProductos VP
                             WHERE VP.id = P.id) [stats]

            FROM Receta R
                     JOIN Producto_receta PR ON R.id = PR.id_receta
                     JOIN Producto P ON PR.id_producto = P.id
            WHERE @id = R.id
            ORDER BY R.nombre
        END

    IF @StatementType = 'Insert'
        BEGIN
            INSERT INTO Receta (id_cliente, estatus, nombre)
            VALUES (@id_cliente, @estatus, @nombre);
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
            -- IMPLEMENTAR TRIGGER QUE ELIMINE REFERENCIAS QUE TENGAN A RECETA ID.
        END

    IF @StatementType = 'AddProduct'
        BEGIN
            INSERT INTO Producto_receta (id_producto, id_receta, porciones)
            VALUES (@id_producto, @id, @porcion);
        END

    IF @StatementType = 'RemoveProduct'
        BEGIN
            DELETE FROM Producto_receta
            WHERE id_receta = @id AND id_producto = @id_producto
        END

END

GO

