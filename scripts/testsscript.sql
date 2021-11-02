

Select email
    FROM(
        SELECT id, email, clave
            FROM Cliente 
            WHERE email =  'jey@gmail.com'
        UNION ALL
        SELECT id, email, clave
            FROM Nutricionista 
            WHERE email =  'jey@gmail.com'
    ) q

DECLARE @temp varchar(20)
SET @temp = ( 
    Select email
    FROM(
        SELECT email
        FROM Cliente 
        WHERE email = 'jey@gmail.com'
        UNION ALL
        SELECT email
        FROM Nutricionista 
        WHERE email ='jey@gmail.com'
) q)

SELECT @temp