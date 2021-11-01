    Create procedure [dbo].[AddNewClient]  
    (  
       @id int,  
       @id_nutricionista int,  
       @nombre varchar (20),
       @primer_apellido varchar (20),
       @segundo_apellido varchar (20),
       @email varchar (20),
       @clave varchar (20),
       @fecha_nacimiento Date,
       @meta_consumo_diario float,
       @altura float,
       @pais varchar (20),
       @estatus varchar (20),
       @idConversacion int
    )  
    as  
    begin  
       Insert into Cliente values(@id,@id_nutricionista,@nombre,@primer_apellido,@segundo_apellido,@email,
       @clave,@fecha_nacimiento,@meta_consumo_diario,@altura,@pais,@estatus,@idConversacion)  
    End