USE [nutridb]

IF OBJECT_ID('Products_Recipe', 'P') IS NOT NULL
    DROP TRIGGER [RecipeRelations];
GO

-- TRIGGER MD5
CREATE TRIGGER dbo.[RecipeRelations]
    ON dbo.Receta
    AFTER UPDATE
    AS
BEGIN
    SET NOCOUNT ON;

    DECLARE
        @id int,
        @status VARCHAR(max)

    -- id
    SELECT @id = id FROM DELETED
    -- status
    SELECT @status = estatus FROM INSERTED

    if @status = 'INACTIVO'
        BEGIN
            DELETE FROM Producto_receta
            WHERE id_receta = @id
        END
END