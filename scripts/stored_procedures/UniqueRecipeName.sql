use nutridb;

IF OBJECT_ID ( 'UniqueRecipeName', 'P' ) IS NOT NULL
    DROP PROCEDURE UniqueRecipeName;
GO

Create procedure [dbo].UniqueRecipeName
    (  
		@nombre varchar(max)
    )
   AS
   BEGIN

    DECLARE @temp varchar(max)
    SET @temp = ( 
        Select nombre
        FROM Receta
        WHERE nombre = @nombre
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