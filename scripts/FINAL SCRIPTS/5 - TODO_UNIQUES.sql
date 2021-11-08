use nutridb;

------------------------------------------------ UNIQUE BARCODE --------------------------------------------

IF OBJECT_ID('UniqueBarcode', 'P') IS NOT NULL
    DROP PROCEDURE UniqueBarcode;
GO

Create procedure [dbo].UniqueBarcode(
    @barcode varchar(50)
)
AS
BEGIN

    DECLARE @temp varchar(20)
    SET @temp = (
        Select barcode
        FROM (
                 SELECT barcode
                 FROM Producto
                 WHERE barcode = @barcode
             ) q1
    )


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

-------------------------------------------- UNIQUE EMAIL -------------------------------------------

IF OBJECT_ID('UniqueEmail', 'P') IS NOT NULL
    DROP PROCEDURE UniqueEmail;
GO

Create procedure [dbo].UniqueEmail(
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

----------------------------------------------------- UNIQUE FECHA MEDIDA -----------------------------------------

IF OBJECT_ID('UniqueFechaMedida', 'P') IS NOT NULL
    DROP PROCEDURE UniqueFechaMedida;
GO

Create procedure [dbo].UniqueFechaMedida(
    @fecha Date,
    @id_cliente int
)
AS
BEGIN

    DECLARE @temp Date
    SET @temp = (
        Select fecha
        FROM (
                 SELECT fecha
                 FROM Medidas
                 WHERE fecha = @fecha
                   and @id_cliente = id_cliente
             ) q1
    )


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

---------------------------------------------- UNIQUE PLAN NAME -----------------------------------------------

IF OBJECT_ID ( 'UniquePlanName', 'P' ) IS NOT NULL
    DROP PROCEDURE UniquePlanName;
GO

Create procedure [dbo].UniquePlanName
    (
		@nombre varchar(max),
		@id_nutricionista int
    )
   AS
   BEGIN

    DECLARE @temp varchar(max)
    SET @temp = (
        Select nombre
        FROM Plans
        WHERE nombre = @nombre and id_nutricionista = @id_nutricionista
        EXCEPT
        SELECT nombre
        FROM Plans
        WHERE estatus = 'INACTIVO'
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


------------------------------------- UNIQUE PRODUCT DESCRIPTION ------------------------------------------------

IF OBJECT_ID('UniqueProductDescription', 'P') IS NOT NULL
    DROP PROCEDURE UniqueProductDescription;
GO

Create procedure [dbo].UniqueProductDescription(
    @description varchar(max)
)
AS
BEGIN

    DECLARE @temp varchar(max)
    SET @temp = (
        Select descripcion
        FROM Producto
        WHERE descripcion = @description
    )

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

------------------------------------------------ UNIQUE RECIPE NAME -------------------------------------------------


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
        EXCEPT
        SELECT nombre
        FROM Receta
        WHERE estatus = 'INACTIVO'
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
go

