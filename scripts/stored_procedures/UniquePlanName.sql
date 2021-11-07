use nutridb;

IF OBJECT_ID ( 'UniquePlanName', 'P' ) IS NOT NULL
    DROP PROCEDURE UniquePlanName;
GO

Create procedure [dbo].UniquePlanName
    (  
		@nombre varchar(max)
    )
   AS
   BEGIN

    DECLARE @temp varchar(max)
    SET @temp = ( 
        Select nombre
        FROM Plans
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