CREATE procedure [dbo].UniqueRecipeName
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
        SELECT 1 -- available
        END

    IF @temp IS NOT NULL
        BEGIN
        SELECT 0 -- unavailable
        END

	END
go

