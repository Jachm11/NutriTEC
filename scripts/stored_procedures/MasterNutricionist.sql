use nutridb;

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
