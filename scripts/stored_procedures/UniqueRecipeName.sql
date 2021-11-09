USE [nutridb]

IF OBJECT_ID('UniqueRecipeName', 'P') IS NOT NULL
    DROP PROCEDURE [UniqueRecipeName];
GO

CREATE procedure [dbo].UniqueRecipeName(
    @id_cliente int,
    @id_receta int = NULL,
    @nombre varchar(max),
    @StatementType NVARCHAR(max) = ''
)
AS
BEGIN

    DECLARE @temp varchar(max)

    IF @StatementType = 'UniqueRecipe'
        BEGIN
            SET @temp = (
                Select nombre
                FROM Receta
                WHERE nombre = @nombre
                  and id_cliente = @id_cliente
                  and estatus = 'ACTIVO'
            )

            -- if the row to be inserted already exists, put the genreID into the @genreID output parameter

            IF @temp IS NULL
                BEGIN
                    SELECT CAST(1 AS bit) -- available
                END

            IF @temp IS NOT NULL
                BEGIN
                    SELECT CAST(0 AS bit) -- unavailable
                END

        END

    -- SI ES UN UPDATE AL MISMO NOMBRE
    IF @StatementType = 'SameName'
        BEGIN
            SET @temp = (
                Select nombre
                FROM Receta
                WHERE id = @id_receta and id_cliente = @id_cliente
            )
            IF @temp = @nombre
                BEGIN
                    SELECT CAST(1 AS bit) -- same name
                END

            IF @temp != @nombre
                BEGIN
                    SELECT CAST(0 AS bit) -- different name
                END
        END

END
go

