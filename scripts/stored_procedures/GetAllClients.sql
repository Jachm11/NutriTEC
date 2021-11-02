CREATE PROCEDURE [dbo].[GetAllClients]
AS
BEGIN


	SELECT [id]
      ,ISNULL([id_nutricionista],0) as [id_nutricionista]
      ,[nombre]
      ,[primer_apellido]
      ,[segundo_apellido]
      ,[email]
      ,[clave]
      ,[fecha_nacimiento]
      ,[meta_consumo_diario]
      ,[altura]
      ,[pais]
      ,[estatus]
	  ,ISNULL([id_conversacion],0) as [id_conversacion]
		 FROM Cliente

END