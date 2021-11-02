CREATE PROCEDURE [dbo].[GetClient]
(
@id int
)
AS
BEGIN
	SELECT [id]
      ,ISNULL([id_nutricionista],-1) as [id_nutricionista]
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
	  ,ISNULL([id_conversacion],-1) as [id_conversacion]
		 FROM Cliente WHERE [id]=@id
END