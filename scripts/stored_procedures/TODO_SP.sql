----------------------------- HASH MD5 -------------------------------------
USE [nutridb]
IF OBJECT_ID('Hash_MD5', 'P') IS NOT NULL
    DROP PROCEDURE [Hash_MD5];
GO

CREATE FUNCTION dbo.[Hash_MD5](
    @data varchar(max)
)
    RETURNS VARCHAR(max)
AS
BEGIN
    DECLARE @hash VARCHAR(max)
    SELECT @hash = CONVERT(VARCHAR(max), HashBytes('MD5', @data), 2)
    RETURN @hash
END

GO

---------------------------------------- TRIGER MD5 -------------------------------------------------------

IF OBJECT_ID('MD5', 'P') IS NOT NULL
    DROP TRIGGER [MD5];
GO

-- TRIGGER MD5
CREATE TRIGGER dbo.[MD5]
    ON dbo.Usuario
    AFTER INSERT, UPDATE
    AS
BEGIN
    SET NOCOUNT ON;

    DECLARE
        @id int,
        @clave VARCHAR(max),
        @md5 VARCHAR(max)

    -- id
    SELECT @id = id FROM INSERTED
    -- clave
    SELECT @clave = clave FROM INSERTED
    -- MD5
    SET @md5 = (SELECT dbo.Hash_MD5(@clave))

    UPDATE Usuario
    SET clave = @md5
    WHERE id = @id;

END
---------------------------------------- RECIPE RELATIONS TRIGGER -----------------------------------------

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

-------------------------------------------- UNQUIE FECHA MEDIDA -------------------------------------------

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

--------------------------------------------- UNIQUE BARCODE ---------------------------------------------

IF OBJECT_ID ( 'UniqueBarcode', 'P' ) IS NOT NULL
    DROP PROCEDURE UniqueBarcode;
GO

Create procedure [dbo].UniqueBarcode
    (
		@barcode varchar(50)
    )
   AS
   BEGIN

    DECLARE @temp varchar(20)
    SET @temp = (
        Select barcode
        FROM(
            SELECT barcode
            FROM Producto
            WHERE barcode = @barcode
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
------------------------------------------ UNIQUE EMAIL ----------------------------------------------

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
-------------------------------------- UNIQUE PLAN NAME --------------------------------------------

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
---------------------------------------- UNIQUE PRODUCT DESCRIPTION -------------------------------

IF OBJECT_ID ( 'UniqueProductDescription', 'P' ) IS NOT NULL
    DROP PROCEDURE UniqueProductDescription;
GO

Create procedure [dbo].UniqueProductDescription
    (
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
---------------------------------------- UNIQUE RECIPE NAME ---------------------------------------

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
---------------------------------------- LOG IN ----------------------------------------------------

IF OBJECT_ID('LogIn', 'P') IS NOT NULL
    DROP PROCEDURE [LogIn];
GO

Create procedure dbo.[LogIn](
    @rol varchar(20) = '',
    @email varchar(20) = NULL,
    @clave varchar(max) = NULL
)
AS
BEGIN
    -- MD5
    DECLARE @md5 VARCHAR(max)
    SET @md5 = (SELECT dbo.Hash_MD5(@clave))

    IF @rol = 'CLIENT'
        BEGIN
            SELECT Cliente.id,
                   id_usuario,
                   estatus,
                   ISNULL(id_nutricionista, -1)                       as id_nutricionista,
                   ISNULL(id_conversacion, -1)                        as id_conversacion,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   meta_consumo_diario,
                   pais

            FROM Usuario
                     JOIN Cliente ON Usuario.id = Cliente.id_usuario
            WHERE email = @email
              AND clave = @md5
        END


    IF @rol = 'NUTRICIONIST'
        BEGIN
            SELECT Nutricionista.id,
                   id_usuario,
                   estatus,
                   cedula,
                   codigo_nutricionista,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   direccion,
                   foto,
                   tarjeta,
                   tipo_cobro
            FROM Usuario
                     JOIN Nutricionista ON Usuario.id = Nutricionista.id_usuario
            WHERE email = @email
              AND clave = @md5
        END

    IF @rol = 'ADMIN'
        BEGIN
            SELECT Administrador.id,
                   id_usuario,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave

            FROM Usuario
                     JOIN Administrador ON Usuario.id = Administrador.id_usuario
            WHERE email = @email
              AND clave = @md5
        END

END

GO

--------------------------------------- REGISTER ----------------------------------------------

IF OBJECT_ID('Register', 'P') IS NOT NULL
    DROP PROCEDURE [Register];
GO

Create procedure [dbo].[Register](
    @primer_nombre varchar(20) = NULL,
    @segundo_nombre varchar(20) = NULL,
    @primer_apellido varchar(20) = NULL,
    @segundo_apellido varchar(20) = NULL,
    @email varchar(20) = NULL,
    @clave varchar(20) = NULL,
    @fecha_nacimiento Date = NULL,
    @meta_consumo_diario float = NULL,
    @pais varchar(20) = NULL,
    @estatus varchar(20) = 'ACTIVO',
    @codigo_nutricionista int = NULL,
    @cedula varchar(32) = NULL,
    @direccion varchar(50) = NULL,
    @foto varchar(50) = NULL,
    @tarjeta varchar(20) = NULL,
    @tipo_cobro varchar(20) = NULL,
    @rol NVARCHAR(20) = ''
)
AS
BEGIN

    -- INSERCION DEL USUARIO.
    insert into Usuario (rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, clave)
    values (@rol, @primer_nombre, @segundo_nombre, @primer_apellido, @segundo_apellido, @email, @clave);

    declare @id_u int
    set @id_u = (select id from Usuario where email = @email)


    IF @rol = 'ADMIN'
        BEGIN
            insert into Administrador (id_usuario)
            values (@id_u);
        END

    IF @rol = 'CLIENT'
        BEGIN
            insert into Cliente (id_usuario, estatus, fecha_nacimiento, meta_consumo_diario, pais)
            values (@id_u, @estatus, @fecha_nacimiento, @meta_consumo_diario, @pais);
        END

    IF @rol = 'NUTRICIONIST'
        BEGIN
            insert into Nutricionista (id_usuario, cedula, codigo_nutricionista, estatus, fecha_nacimiento, direccion,
                                       foto,
                                       tarjeta, tipo_cobro)
            values (@id_u, @cedula, @codigo_nutricionista, @estatus, @fecha_nacimiento, @direccion, @foto, @tarjeta,
                    @tipo_cobro);
        END

END

GO

----------------------------------------- MASTER CLIENT -------------------------------------------------------

IF OBJECT_ID('MasterClient', 'P') IS NOT NULL
    DROP PROCEDURE [MasterClient];
GO

Create procedure dbo.[MasterClient](
    @id int = NULL,
    @id_nutricionista int = NULL,
    @id_conversacion int = NULL,
    @fecha Date = NULL,
    @porcentaje_musculo float = NULL,
    @porcentaje_grasa float = NULL,
    @cadera float = NULL,
    @peso float = NULL,
    @altura float = NULL,
    @cintura float = NULL,
    @cuello float = NULL,
    @StatementType NVARCHAR(20) = ''
)
AS
BEGIN

    IF @StatementType = 'SelectAll'
        BEGIN
            SELECT Cliente.id,
                   ISNULL(id_nutricionista, -1)                       as id_nutricionista,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   meta_consumo_diario,
                   pais,
                   estatus,
                   ISNULL(id_conversacion, -1)                        as id_conversacion
            FROM Usuario
                     JOIN Cliente ON Usuario.id = Cliente.id_usuario
            WHERE rol = 'CLIENT'

        END

    IF @StatementType = 'SelectOne'
        BEGIN
            SELECT Cliente.id,
                   ISNULL(id_nutricionista, -1)                       as id_nutricionista,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   meta_consumo_diario,
                   pais,
                   estatus,
                   ISNULL(id_conversacion, -1)                        as id_conversacion
            FROM Usuario
                     JOIN Cliente ON Usuario.id = Cliente.id_usuario
            WHERE @id = Cliente.id

        END

    IF @StatementType = 'AssignN'
        BEGIN
            UPDATE Cliente
            SET id_nutricionista = @id_nutricionista
            WHERE id = @id
        END

    IF @StatementType = 'AssignC'
        BEGIN
            UPDATE Cliente
            SET id_conversacion = @id_conversacion
            WHERE id = @id
        END

    IF @StatementType = 'RegistrarMedidas'
        BEGIN

            insert into Medidas (id_cliente, fecha, porcentaje_musculo, porcentaje_grasa, cadera, peso, altura, cintura,
                                 cuello)
            values (@id, @fecha, @porcentaje_musculo, @porcentaje_grasa, @cadera, @peso, @altura, @cintura, @cuello);

            SELECT CAST(1 AS bit)

        END

    IF @StatementType = 'GetMedidas'
        BEGIN


            select fecha,
                   porcentaje_musculo,
                   porcentaje_grasa,
                   cadera,
                   peso,
                   altura,
                   cintura,
                   cuello
            from Medidas
            where id_cliente = @id

        END
END

GO

---------------------------------------------------- MASTER NUTRICIONIST -------------------------------------

IF OBJECT_ID ( 'MasterNutricionist', 'P' ) IS NOT NULL
    DROP PROCEDURE [MasterNutricionist];
GO

Create procedure [dbo].[MasterNutricionist]
    (
       @id int = NULL,
       @StatementType NVARCHAR(20) = ''
   )
   AS
   BEGIN

    IF @StatementType = 'SelectOne'
    BEGIN
    SELECT Nutricionista.id,
                   id_usuario,
                   estatus,
                   cedula,
                   codigo_nutricionista,
                   primer_nombre,
                   segundo_nombre,
                   primer_apellido,
                   segundo_apellido,
                   email,
                   clave,
                   fecha_nacimiento,
                   DATEDIFF(hour, fecha_nacimiento, GETDATE()) / 8766 AS edad,
                   direccion,
                   foto,
                   tarjeta,
                   tipo_cobro
            FROM Usuario
                     JOIN Nutricionista ON Usuario.id = Nutricionista.id_usuario
            WHERE Nutricionista.id = @id
    END


	END

GO
------------------------------------------------ MASTER PRODUCT ---------------------------------------------------

IF OBJECT_ID ( 'MasterProduct', 'P' ) IS NOT NULL
    DROP PROCEDURE [MasterProduct];
GO

Create procedure [dbo].[MasterProduct]
    (
       @id int = NULL,
       @barcode varchar (50) = NULL,
	   @estatus varchar (20) = 'ESPERA',
       @descripcion varchar (20) = NULL,
       @tamano_porcion float = NULL,
       @sodio float = NULL,
       @grasa float = NULL,
       @energia float = NULL,
       @hierro float = NULL,
       @calcio float = NULL,
       @proteina float = NULL,
       @vitamina float = NULL,
       @carbohidratos float = NULL,
       @StatementType NVARCHAR(20) = ''
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
        INSERT INTO Producto (
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
            )
        VALUES (
            @barcode,
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
			@carbohidratos
            )
        END

    IF @StatementType = 'Update'
        BEGIN
        UPDATE Producto
        SET
            [estatus] = @estatus
        WHERE id = @id
        END


	END

GO

------------------------------------------- MASTER PLANS -----------------------------------------

IF OBJECT_ID('MasterPlans', 'P') IS NOT NULL
    DROP PROCEDURE [MasterPlans];
GO

Create procedure [dbo].[MasterPlans](
    @id int = NULL,
    @id_cliente int = NULL,
    @id_nutricionista int = NULL,
    @id_producto int = NULL,
    @id_plan_cliente int = NULL,
    @fecha Date = NULL,
    @nombre varchar(20) = NULL,
    @tiempo_comida varchar(20) = NULL,
    @porciones float = NULL,
    @estatus varchar(20) = 'ACTIVO',
    @StatementType NVARCHAR(20) = ''
)
AS
BEGIN

    IF @StatementType = 'SelectAll'
        BEGIN
            select * from Plans where id_nutricionista = @id_nutricionista and estatus != 'INACTIVO'
        END

    IF @StatementType = 'SelectOne'
        BEGIN
            select *
            from VistaProductosPlan
            where id_plan = @id
        END

    IF @StatementType = 'InsertPlan'
        BEGIN
            insert into Plans (id_nutricionista, estatus, nombre)
            values (@id_nutricionista, @estatus, @nombre)
        END

    IF @StatementType = 'InsertProductsPlan'
        BEGIN
            insert into Productos_plan (id_producto, id_plan, tiempo_comida, porciones)
            values (@id_producto, @id, @tiempo_comida, @porciones)
        END

    IF @StatementType = 'DeletePlan'
        BEGIN
            update Plans
            set estatus = 'INACTIVO'
            where id = @id
        END

    IF @StatementType = 'DeletePlanProduct'
        BEGIN
            delete
            from Productos_plan
            where id_producto = @id_producto and id_plan = @id and tiempo_comida = @tiempo_comida
        END


    IF @StatementType = 'UpdateProductPlan'
        BEGIN
            update Productos_plan
            set porciones = @porciones
            where id_plan = @id and id_producto = @id_producto and tiempo_comida = @tiempo_comida
        END


END

GO

-------------------------------------------- MASTER RECIPE --------------------------------------

IF OBJECT_ID('MasterRecipe', 'P') IS NOT NULL
    DROP PROCEDURE [MasterRecipe];
GO

Create procedure dbo.[MasterRecipe](
    @id int = NULL,
    @id_cliente int = NULL,
    @id_producto int = NULL,
    @nombre VARCHAR(20) = NULL,
    @estatus VARCHAR(20) = 'ACTIVO',
    @porcion float = NULL,
    @StatementType NVARCHAR(20) = ''
)
AS
BEGIN

    IF @StatementType = 'SelectAll'
        BEGIN

            SELECT DISTINCT R.id        as       id_receta,
                            R.estatus   as       estado_receta,
                            R.nombre    as       nombre_receta,
                            P.id        as       id_producto,
                            barcode,
                            descripcion as       nombre_producto,
                            porciones   as       porcion_agregada,
                            tamano_porcion,
--                             sodio,
--                             grasa,
--                             energia,
--                             hierro,
--                             calcio,
--                             proteina,
--                             vitamina,
--                             carbohidratos

                            (SELECT estadisticas
                             FROM VistaListaProducto VP
                             WHERE VP.id = P.id) [stats]

            FROM Receta R
                     JOIN Producto_receta PR ON R.id = PR.id_receta
                     JOIN Producto P ON PR.id_producto = P.id
            ORDER BY R.nombre
        END

    IF @StatementType = 'SelectOne'
        BEGIN
            SELECT DISTINCT R.id        as       id_receta,
                            R.estatus   as       estado_receta,
                            R.nombre    as       nombre_receta,
                            P.id        as       id_producto,
                            barcode,
                            descripcion as       nombre_producto,
                            porciones   as       porcion_agregada,
                            tamano_porcion,
--                             sodio,
--                             grasa,
--                             energia,
--                             hierro,
--                             calcio,
--                             proteina,
--                             vitamina,
--                             carbohidratos

                            (SELECT estadisticas
                             FROM VistaListaProducto VP
                             WHERE VP.id = P.id) [stats]

            FROM Receta R
                     JOIN Producto_receta PR ON R.id = PR.id_receta
                     JOIN Producto P ON PR.id_producto = P.id
            WHERE @id = R.id
            ORDER BY R.nombre
        END

    IF @StatementType = 'Insert'
        BEGIN
            INSERT INTO Receta (id_cliente, estatus, nombre)
            VALUES (@id_cliente, @estatus, @nombre);
        END


    IF @StatementType = 'Update'
        BEGIN
            UPDATE Receta
            SET nombre = @nombre
            WHERE id = @id
        END

    IF @StatementType = 'Delete'
        BEGIN
            UPDATE Receta
            SET estatus = 'INACTIVO'
            WHERE id = @id
            -- IMPLEMENTAR TRIGGER QUE ELIMINE REFERENCIAS QUE TENGAN A RECETA ID.
        END

    IF @StatementType = 'AddProduct'
        BEGIN
            INSERT INTO Producto_receta (id_producto, id_receta, porciones)
            VALUES (@id_producto, @id, @porcion);
        END

    IF @StatementType = 'RemoveProduct'
        BEGIN
            DELETE FROM Producto_receta
            WHERE id_receta = @id AND id_producto = @id_producto
        END

END

GO

