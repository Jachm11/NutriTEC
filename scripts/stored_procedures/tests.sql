SELECT *
from Receta
SELECT * from Producto_receta
JOIN Producto P on Producto_receta.id_producto = P.id

UPDATE Receta
SET estatus = 'INACTIVO'
WHERE id = 4

SELECT *
FROM Receta
         INNER JOIN Producto_receta ON Receta.id = Producto_receta.id_receta
         JOIN Producto ON Producto_receta.id_producto = Producto.id

Declare @name varchar(max) = 'Arroz con huevo frito'
SELECT Receta.id, Receta.estatus, nombre
FROM Receta
WHERE Receta.nombre = @name
















Declare @name varchar(max) = 'Arroz con huevo frito'
SELECT R.id,
       R.estatus,
       R.nombre,

       STUFF((
                 SELECT DISTINCT ' ; ' + P.descripcion + ' : '
                            + ' sodio:' + CAST(sodio AS VARCHAR(max))
                            + ', grasa:' + CAST(grasa AS VARCHAR(max))
                            + ', energia:' + CAST(energia AS VARCHAR(max))
                            + ', hierro:' + CAST(hierro AS VARCHAR(max))
                            + ', calcio:' + CAST(calcio AS VARCHAR(max))
                            + ', proteina:' + CAST(proteina AS VARCHAR(max))
                            + ', vitamina:' + CAST(vitamina AS VARCHAR(max))
                            + ', carbohidratos:' + CAST(carbohidratos AS VARCHAR(max))
                 FROM Receta
                          INNER JOIN Producto_receta PR ON Receta.id = PR.id_receta
                          INNER JOIN Producto P ON PR.id_producto = P.id
                 WHERE R.id = Receta.id
                 FOR XML PATH('')), 1, 1, '') [stats]
FROM Receta R
-- WHERE R.nombre = @name
-- GROUP BY
--          R.id,
--          R.estatus,
--          R.nombre
ORDER BY 1, 2



create view VistaPrettyProductos
as
SELECT id,
       estatus,
       descripcion,

       STUFF((
                 SELECT DISTINCT
                            + ' sodio:' + CAST(sodio AS VARCHAR(max))
                            + ', grasa:' + CAST(grasa AS VARCHAR(max))
                            + ', energia:' + CAST(energia AS VARCHAR(max))
                            + ', hierro:' + CAST(hierro AS VARCHAR(max))
                            + ', calcio:' + CAST(calcio AS VARCHAR(max))
                            + ', proteina:' + CAST(proteina AS VARCHAR(max))
                            + ', vitamina:' + CAST(vitamina AS VARCHAR(max))
                            + ', carbohidratos:' + CAST(carbohidratos AS VARCHAR(max))
                 FROM Producto
                 WHERE Producto.id = P.id
                 FOR XML PATH('')), 1, 1, '') [estadisticas]
FROM Producto P


SELECT DISTINCT R.id        as id_receta,
                R.estatus   as estado_receta,
                R.nombre    as nombre_receta,
                P.id        as id_producto,
                barcode,
                descripcion as nombre_producto,
                porciones as porcion_agregada,
                tamano_porcion,
                (SELECT estadisticas
                    FROM VistaPrettyProductos VP
                    WHERE VP.id = P.id) [stats]
--                 sodio,
--                 grasa,
--                 energia,
--                 hierro,
--                 calcio,
--                 proteina,
--                 vitamina,
--                 carbohidratos
FROM Receta R
         JOIN Producto_receta PR ON R.id = PR.id_receta
         JOIN Producto P ON PR.id_producto = P.id
ORDER BY R.nombre


