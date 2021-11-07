USE [nutridb]

IF OBJECT_ID('MD5', 'P') IS NOT NULL
    DROP TRIGGER [MD5];
GO

-- TRIGGER MD5
CREATE TRIGGER dbo.[MD5]
    ON dbo.Usuario
    AFTER INSERT, UPDATE
    AS
BEGIN
    SET NOCOUNT ON;

    DECLARE
        @id int,
        @clave VARCHAR(max),
        @md5 VARCHAR(max)

    -- id
    SELECT @id = id FROM INSERTED
    -- clave
    SELECT @clave = clave FROM INSERTED
    -- MD5
    SET @md5 = (SELECT dbo.Hash_MD5(@clave))

    UPDATE Usuario
    SET clave = @md5
    WHERE id = @id;

END
