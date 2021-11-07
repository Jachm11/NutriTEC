SELECT dbo.(name) As HashValue, name As ProcedureName FROM sys.procedures;

SELECT CONVERT(CHAR(32), HashBytes('MD5', 'Clave'), 2)

SELECT HashBytes('MD5', 'aa') as Hashcode,
len(HashBytes('MD5', 'aa')) as length

