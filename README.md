# Proyecto Final aplicación e-Commerce. CoderHouse Backend Node.Js

Deberás entregar el avance de tu aplicación eCommerce Backend
correspondiente a la segunda entrega de tu proyecto final.

## Consigna:

Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar
dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con
Carritos.

## Aspectos a incluir en el entregable:

* a. A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects),
  y pueden ir todas incluidas en una misma carpeta de ‘daos’.
  b. En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia
  de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará
  en base al valor de una variable de entorno cargada al momento de ejecutar el servidor
  (opcional: investigar el uso de imports dinámicos).
  c. Incluir un archivo de configuración (config) que contenga los datos correspondientes para
  conectarse a las bases de datos o medio de persistencia que corresponda.

### A tener en cuenta:

* Para realizar la prueba de funcionalidad hay dos opciones:
  1. Probar con postman cada uno de los endpoints (productos y carrito) y su operación en conjunto.
  2. Realizar una aplicación frontend sencilla, utilizando HTML/CSS/JS ó algún framework de preferencia, que represente el listado de productos en forma de cards. En cada card figuran los datos del producto, que, en el caso de ser administradores, podremos editar su información. Para este último caso incorporar los botones actualizar y eliminar.
     También tendremos un formulario de ingreso de productos nuevos con los campos correspondientes y un botón enviar. Asimismo, construir la vista del carrito donde se podrán ver los productos agregados e incorporar productos a comprar por su id de producto. Esta aplicación de frontend debe enviar los requests get, post, put y delete al servidor utilizando fetch y debe estar ofrecida en su espacio público.
* En todos los casos, el diálogo entre el frontend y el backend debe ser en formato JSON. El servidor no debe generar ninguna vista.
* En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}
* La estructura de programación será ECMAScript, separada tres en módulos básicos (router, lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas.
  Utilizar preferentemente clases, constructores de variables let y const y arrow function.
* Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch.com

# Como ejecutar el proyecto:

- Ejecutar el comando ``npm install``
- Ejecutar el comando ``npm run start``
- Para probar/testear los diferentes rutas y funcionalidades, se recomienda utilizar [Postman](https://www.postman.com/downloads/)

```

```
