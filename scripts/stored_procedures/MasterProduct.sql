use nutridb;

IF OBJECT_ID('MasterProduct', 'P') IS NOT NULL
    DROP PROCEDURE [MasterProduct];
GO

Create procedure [dbo].[MasterProduct](
    @id int = NULL,
    @barcode varchar(50) = NULL,
    @estatus varchar(20) = 'ESPERA',
    @descripcion varchar(20) = NULL,
    @tamano_porcion float = NULL,
    @sodio float = NULL,
    @grasa float = NULL,
    @energia float = NULL,
    @hierro float = NULL,
    @calcio float = NULL,
    @proteina float = NULL,
    @vitamina float = NULL,
    @carbohidratos float = NULL,
    @StatementType NVARCHAR(max) = ''
)
AS
BEGIN

    IF @StatementType = 'SelectAll'
        BEGIN
            SELECT [id],
                   [barcode],
                   [estatus],
                   [descripcion],
                   [tamano_porcion],
                   [sodio],
                   [grasa],
                   [energia],
                   [hierro],
                   [calcio],
                   [proteina],
                   [vitamina],
                   [carbohidratos]
            FROM Producto
            ORDER BY [id] ASC
        END

    IF @StatementType = 'SelectAllRestrincted'
        BEGIN
            SELECT [id],
                   [barcode],
                   [estatus],
                   [descripcion],
                   [tamano_porcion],
                   [sodio],
                   [grasa],
                   [energia],
                   [hierro],
                   [calcio],
                   [proteina],
                   [vitamina],
                   [carbohidratos]
            FROM Producto
            WHERE estatus = 'APROBADO'
        END

    IF @StatementType = 'SelectOne'
        BEGIN
            SELECT [id],
                   [barcode],
                   [estatus],
                   [descripcion],
                   [tamano_porcion],
                   [sodio],
                   [grasa],
                   [energia],
                   [hierro],
                   [calcio],
                   [proteina],
                   [vitamina],
                   [carbohidratos]
            FROM Producto
            WHERE id = @id
        END

    IF @StatementType = 'Insert'
        BEGIN
            INSERT INTO Producto ([barcode],
                                  [estatus],
                                  [descripcion],
                                  [tamano_porcion],
                                  [sodio],
                                  [grasa],
                                  [energia],
                                  [hierro],
                                  [calcio],
                                  [proteina],
                                  [vitamina],
                                  [carbohidratos])
            VALUES (@barcode,
                    @estatus,
                    @descripcion,
                    @tamano_porcion,
                    @sodio,
                    @grasa,
                    @energia,
                    @hierro,
                    @calcio,
                    @proteina,
                    @vitamina,
                    @carbohidratos)
        END

    IF @StatementType = 'Update'
        BEGIN
            UPDATE Producto
            SET [estatus] = @estatus
            WHERE id = @id
        END


END

GO

