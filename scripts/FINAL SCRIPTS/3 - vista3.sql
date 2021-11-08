Create view VistaPacientesPorNutricionista
as
SELECT N.id as id_nutricionista, C.id as id_paciente, C.estatus as estatus, U.email, C.fecha_nacimiento,
       U.primer_nombre + ' ' + U.segundo_nombre + ' ' + U.primer_apellido + ' ' + U.segundo_apellido as Nombre_Completo,
       C.meta_consumo_diario,  C.id_conversacion
FROM Nutricionista N
JOIN Cliente C on N.id = C.id_nutricionista
JOIN Usuario U on U.id = C.id_usuario