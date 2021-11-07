use nutridb;
DECLARE @data VARCHAR(20) = '1234'
DECLARE @data1 VARCHAR(20) = 'Adrian'
SELECT @data Data, dbo.Hash_MD5(@data) As MD5
UNION
SELECT @data1 Data, dbo.Hash_MD5(@data1) As MD5;