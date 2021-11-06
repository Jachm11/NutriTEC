use nutridb;

IF OBJECT_ID ( 'UniqueEmail', 'P' ) IS NOT NULL
    DROP PROCEDURE UniqueEmail;  
GO

Create procedure [dbo].UniqueEmail  
    (  
		@email varchar(20)
    )
   AS
   BEGIN

    DECLARE @temp varchar(20)
    SET @temp = ( 
        Select email
        FROM Usuario
        WHERE email = @email

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