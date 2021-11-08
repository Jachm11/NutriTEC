CREATE VIEW VistaNutricionistas
AS
SELECT N.id,
       N.tipo_cobro                                                                                  as tipo_de_pago,
       U.email                                                                                       as correo_electronico,
       U.primer_nombre + ' ' + U.segundo_nombre + ' ' + U.primer_apellido + ' ' + U.segundo_apellido as nombre_completo,
       N.tarjeta                                                                                     as numero_de_tarjeta,
       (SELECT Count(*)
       FROM VistaPacientesPorNutricionista V
       JOIN Nutricionista Nu on U.id = Nu.id_usuario
       WHERE V.id_nutricionista = Nu.id) as numero_pacientes
FROM USUARIO U
JOIN Nutricionista N on U.id = N.id_usuario

