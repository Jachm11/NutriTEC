USE [nutridb]

------------------------------------------- MASTER CLIENT --------------------------------------------------------
USE [nutridb]

IF OBJECT_ID('MasterClient', 'P') IS NOT NULL
    DROP PROCEDURE [MasterClient];
GO

Create procedure dbo.[MasterClient](
    @id int = NULL,
    @id_nutricionista int = NULL,
    @id_conversacion int = NULL,
    @id_producto int = NULL,
    @tiempo_comida varchar(20) = '',
    @fecha Date = NULL,
    @fechaInicio Date = NULL,
    @fechaFin Date = NULL,
    @porcentaje_musculo float = NULL,
    @porcentaje_grasa float = NULL,
    @cadera float = NULL,
    @peso float = NULL,
    @altura float = NULL,
    @cintura float = NULL,
    @cuello float = NULL,
    @StatementType NVARCHAR(max) = ''
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

    IF @StatementType = 'RegistroConsumoDiario'
        BEGIN
            insert into Consumo_diario (id_cliente, id_producto, tiempo_comida, fecha)
            values (@id, @id_producto, @tiempo_comida, @fecha)
        END

    IF @StatementType = 'ReporteAvance'
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
              and fecha <= @fechaInicio
              and fecha >= @fechaFin
        END

    IF @StatementType = 'GetClientsWithoutNutri'
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
            WHERE rol = 'CLIENT' and id_nutricionista IS NULL
        END


END

GO
---------------------------------------------------- MASTER NUTRICIONIST ----------------------------------------------

IF OBJECT_ID('MasterNutricionist', 'P') IS NOT NULL
    DROP PROCEDURE [MasterNutricionist];
GO

Create procedure [dbo].[MasterNutricionist](
    @id int = NULL,
    @id_plan int = NULL,
    @id_cliente int = NULL,
    @fecha Date = NULL,
    @StatementType NVARCHAR(max) = ''
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

    IF @StatementType = 'AssignPlanToClient'
        BEGIN

            if (select fecha from Plan_cliente where id_cliente = @id_cliente and fecha = @fecha) = @fecha
                begin
                    SELECT CAST(0 AS bit) -- unavailable
                end
            else
                begin
                    SELECT CAST(1 AS bit) -- available
                    insert into Plan_cliente (id_plan, id_cliente, fecha)
                    values (@id_plan, @id_cliente, @fecha);
                end
        END

    IF @StatementType = 'SeguimientoPlanFecha'
        BEGIN
            SELECT id_plan, nombre, fecha
            FROM Plans
                     JOIN Plan_cliente on Plans.id = Plan_cliente.id_plan
            WHERE id_cliente = @id_cliente
        END

    IF @StatementType = 'SeguimientoConsumoDiarioFechas'
        BEGIN
            SELECT distinct fecha
            FROM Consumo_diario
            WHERE id_cliente = @id_cliente
        END

    IF @StatementType = 'SeguimientoConsumoDiarioPorFecha'
        BEGIN
            SELECT id_producto, tiempo_comida, barcode, descripcion, tamano_porcion, sodio, grasa, energia, hierro, calcio, proteina, vitamina, carbohidratos
            FROM Consumo_diario join Producto on id_producto = Producto.id
            WHERE id_cliente = @id_cliente and fecha = @fecha
        END

END

GO

----------------------------------------------- MASTER PLANS --------------------------------------------------------

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

            select * from Plans where id_nutricionista = @id_nutricionista and nombre = @nombre

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
            where id_producto = @id_producto
              and id_plan = @id
              and tiempo_comida = @tiempo_comida
        END


    IF @StatementType = 'UpdateProductPlan'
        BEGIN
            update Productos_plan
            set porciones = @porciones
            where id_plan = @id
              and id_producto = @id_producto
              and tiempo_comida = @tiempo_comida
        END


END

GO


------------------------------------------------------- MASTER PRODUCTS ----------------------------------------------
use nutridb;

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

----------------------------------------------------- MASTER RECIPE -------------------------------------------------
IF OBJECT_ID('MasterRecipe', 'P') IS NOT NULL
    DROP PROCEDURE [MasterRecipe];
GO

CREATE procedure dbo.[MasterRecipe](
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

    IF @StatementType = 'SelectClientRecipes'
        BEGIN
            SELECT id, estatus, nombre
            FROM Receta
            WHERE id_cliente = @id_cliente  AND estatus = 'ACTIVO'
            ORDER BY nombre
        END

    IF @StatementType = 'SelectRecipeProducts'
        BEGIN
            SELECT id_producto,
                   barcode,
                   nombre_producto,
                   porcion_agregada,
                   medida_porcion,
                   sodio,
                   grasa,
                   energia,
                   hierro,
                   calcio,
                   proteina,
                   vitamina,
                   carbohidratos
            FROM VistaRecetaProductos V
            WHERE V.id_receta = @id
            ORDER BY nombre_producto
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
            -- TRIGGER ELIMINA REFERENCIAS QUE TENGAN A RECETA ID.
        END

    IF @StatementType = 'AddProduct'
        BEGIN
            INSERT INTO Producto_receta (id_producto, id_receta, porciones)
            VALUES (@id_producto, @id, @porcion);
        END

    IF @StatementType = 'RemoveProduct'
        BEGIN
            DELETE
            FROM Producto_receta
            WHERE id_receta = @id
              AND id_producto = @id_producto
        END

END
go

