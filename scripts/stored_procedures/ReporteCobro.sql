USE [nutridb]

------------------------------------ REPORTE DE COBRO

IF OBJECT_ID('ReporteCobro', 'P') IS NOT NULL
    DROP PROCEDURE [ReporteCobro];
GO

CREATE procedure dbo.[ReporteCobro]
    (
    @tipo varchar(20)
    )
AS
BEGIN
    SELECT tipo_de_pago, correo_electronico, nombre_completo, numero_de_tarjeta,
           numero_pacientes as monto_total,
    (CASE WHEN tipo_de_pago = 'Mensual' THEN '5%'
          WHEN tipo_de_pago = 'Anual' THEN '10%'
          ELSE '-'
          END) AS descuento,
    (CASE WHEN tipo_de_pago = 'Mensual' THEN numero_pacientes - (numero_pacientes * 0.05)
          WHEN tipo_de_pago = 'Anual' THEN numero_pacientes - (numero_pacientes * 0.10)
          ELSE numero_pacientes
          END) AS monto_a_cobrar
    FROM VistaNutricionistas
    WHERE lower(tipo_de_pago) = @tipo
END
go

