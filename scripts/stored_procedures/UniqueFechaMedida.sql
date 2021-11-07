use nutridb;

IF OBJECT_ID ( 'UniqueFechaMedida', 'P' ) IS NOT NULL
    DROP PROCEDURE UniqueFechaMedida;
GO

Create procedure [dbo].UniqueFechaMedida
    (
		@fecha Date,
		@id_cliente int
    )
   AS
   BEGIN

    DECLARE @temp Date
    SET @temp = (
        Select fecha
        FROM(
            SELECT fecha
            FROM Medidas
            WHERE fecha = @fecha and @id_cliente = id_cliente
		) q1
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

GO