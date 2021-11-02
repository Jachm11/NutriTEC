IF OBJECT_ID ( 'MasterClient', 'P' ) IS NOT NULL
    DROP PROCEDURE [MasterClient];  
GO

Create procedure [dbo].[MasterClient]  
    (  
       @id int = NULL,
       @id_nutricionista int = NULL,
       @nombre varchar (20) = NULL,
       @primer_apellido varchar (20) = NULL,
       @segundo_apellido varchar (20) = NULL,
       @email varchar (20) = NULL,
       @clave varchar (20) = NULL,
       @fecha_nacimiento Date = NULL,
       @meta_consumo_diario float = NULL,
       @altura float = NULL,
       @pais varchar (20) = NULL,
       @estatus varchar (20) = NULL,
       @id_conversacion int = NULL,
       @StatementType NVARCHAR(20) = ''
   )
   AS
   BEGIN

    IF @StatementType = 'SelectAll'
        BEGIN
        SELECT [id],
              ISNULL([id_nutricionista],-1) as [id_nutricionista],
              [nombre],
              [primer_apellido],
              [segundo_apellido],
              [email],
              [clave],
              [fecha_nacimiento],
              DATEDIFF(hour,[fecha_nacimiento],GETDATE())/8766 AS [edad],
              [meta_consumo_diario],
              [altura],
              [pais],
              [estatus],
              ISNULL([id_conversacion],-1) as [id_conversacion]
        FROM Cliente
        ORDER BY [nombre] ASC
        END
    
    IF @StatementType = 'SelectOne'
    BEGIN
    SELECT [id],
            ISNULL([id_nutricionista],-1) as [id_nutricionista],
            [nombre],
            [primer_apellido],
            [segundo_apellido],
            [email],
            [clave],
            [fecha_nacimiento],
            DATEDIFF(hour,[fecha_nacimiento],GETDATE())/8766 AS [edad],
            [meta_consumo_diario],
            [altura],
            [pais],
            [estatus],
            ISNULL([id_conversacion],-1) as [id_conversacion]
    FROM Cliente
    WHERE id = @id
    END

	IF @StatementType = 'LogIn'
    BEGIN
    SELECT [id],
			ISNULL([id_nutricionista],-1) as [id_nutricionista],
            [nombre],
            [primer_apellido],
            [segundo_apellido],
            [email],
            [clave],
            [fecha_nacimiento],
            DATEDIFF(hour,[fecha_nacimiento],GETDATE())/8766 AS [edad],
            [meta_consumo_diario],
            [altura],
            [pais],
            [estatus],
            ISNULL([id_conversacion],-1) as [id_conversacion]
    FROM Cliente
    WHERE [email] = @email AND [clave] = @clave
    END

    IF @StatementType = 'Insert'
        BEGIN
        INSERT INTO Cliente (
            [nombre],
            [primer_apellido],
            [segundo_apellido],
            [email],
            [clave],
            [fecha_nacimiento],
            [meta_consumo_diario],
            [altura],
            [pais],
            [estatus]
            )
        VALUES ( 
            @nombre, 
            @primer_apellido, 
            @segundo_apellido, 
            @email, 
            @clave, 
            @fecha_nacimiento, 
            @meta_consumo_diario, 
            @altura, @pais, 
            @estatus
            )
        END

    IF @StatementType = 'Update'
        BEGIN
        UPDATE Cliente
        SET [id_nutricionista] = @id_nutricionista,
            [nombre] = @nombre,
            [primer_apellido] = @primer_apellido,
            [segundo_apellido] = @segundo_apellido,
            [email] = @email,
            [clave] = @clave,
            [fecha_nacimiento] = @fecha_nacimiento,
            [meta_consumo_diario] = @meta_consumo_diario,
            [altura] = @altura,
            [pais] = @pais,
            [estatus] = @estatus,
            [id_conversacion] = @id_conversacion
        WHERE id = @id
        END

    IF @StatementType = 'AssignN'
        BEGIN
        UPDATE Cliente
        SET [id_nutricionista] = @id_nutricionista
        WHERE id = @id
        END

    IF @StatementType = 'AssignC'
        BEGIN
        UPDATE Cliente
        SET [id_conversacion] = @id_conversacion
        WHERE id = @id
        END


	END

GO

