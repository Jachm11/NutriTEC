USE [nutridb]

IF OBJECT_ID('ReporteCobro', 'P') IS NOT NULL
    DROP PROCEDURE [ReporteCobro];
GO

CREATE procedure dbo.[ReporteCobro]
AS
BEGIN
    SELECT tipo_de_pago, corre_electronico, nombre_completo, numero_de_tarjeta,
    (SELECT COUNT(*)) as monto_total,
    (CASE WHEN tipo_de_pago = 'Mensual' THEN '5%'
          WHEN tipo_de_pago = 'Anual' THEN '10%'
          ELSE '-'
          END) AS descuento,
    (CASE WHEN tipo_de_pago = 'Mensual' THEN numero_pacientes - (numero_pacientes * 0.05)
          WHEN tipo_de_pago = 'Anual' THEN numero_pacientes - (numero_pacientes * 0.10)
          ELSE numero_pacientes
          END) AS monto_a_cobrar
    FROM VistaNutricionistas
END
go

