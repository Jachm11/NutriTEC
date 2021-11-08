USE [nutridb]

IF OBJECT_ID('UniqueRecipeName', 'P') IS NOT NULL
    DROP PROCEDURE [UniqueRecipeName];
GO

CREATE procedure [dbo].UniqueRecipeName
    (
        @id_cliente int,
		@nombre varchar(max)
    )
   AS
   BEGIN

    DECLARE @temp varchar(max)
    SET @temp = (
        Select nombre
        FROM Receta
        WHERE nombre = @nombre and id_cliente = @id_cliente
	)

    -- if the row to be inserted already exists, put the genreID into the @genreID output parameter

    IF @temp IS NULL
        BEGIN
        SELECT 1 -- available
        END

    IF @temp IS NOT NULL
        BEGIN
        SELECT 0 -- unavailable
        END

	END
go

