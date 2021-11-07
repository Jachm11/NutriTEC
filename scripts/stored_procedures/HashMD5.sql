USE [nutridb]

IF OBJECT_ID('Hash_MD5', 'P') IS NOT NULL
    DROP PROCEDURE [Hash_MD5];
GO

CREATE FUNCTION dbo.[Hash_MD5](
    @data varchar(max)
)
    RETURNS VARCHAR(max)
AS
BEGIN
    DECLARE @hash VARCHAR(max)
    SELECT @hash = CONVERT(VARCHAR(max), HashBytes('MD5', @data), 2)
    RETURN @hash
END

GO
