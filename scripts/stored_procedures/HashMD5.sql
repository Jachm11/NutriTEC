USE [nutridb]

IF OBJECT_ID('Hash_MD5', 'P') IS NOT NULL
    DROP PROCEDURE [Hash_MD5];
GO

CREATE FUNCTION dbo.[Hash_MD5](
    @data varchar(max)
)
    RETURNS CHAR(20)
AS
BEGIN
    DECLARE @hash CHAR(20)
    SELECT @hash = CONVERT(VARCHAR(20), HashBytes('MD5', @data), 2)
    RETURN @hash
END

GO
