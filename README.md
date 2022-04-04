# Serverless Node.js - Mysql

## Descripción:

* Crear una API en Node.js con el framework Serverless para un despliegue en AWS.
* Adaptar y transformar los modelos de la API de prueba. Se tienen que mapear todos los nombres de atributos modelos del inglés al español (Ej: name -> nombre).
* Integrar la API de prueba StarWars API (líneas abajo está el link)
* Crear un modelo de su elección mediante el uso de un endpoint POST, la data se tendrá que almacenar dentro de una base de datos.
* Crear un endpoint GET que muestre la data almacenada.

![Arquitectura](https://i.ibb.co/nbdHq5C/arquitectura.jpg)

API de prueba SWAPI: https://swapi.py4e.com/documentation

### Endpoints disponibles 

##### Films

| Resource / HTTP method | Post             | Get         | Patch                  | Delete             |
| ---------------------- | ---------------- | ----------- | ---------------------- | ------------------ |
| `api/films`            | Create new film  | List films  | Error                  | Error              |
| `api/films/{id}`       | Error            | Get film    | Update user if exists  | Delete film        |

`api/films` acepta el parametro **lang**, especificado con el valor **en**, mapea los campos ingles, por defecto es en español.

```bash
http://localhost:3000/development/api/films?lang=en
```

##### People

| Resource / HTTP method | Post             | Get         | Patch                  | Delete             |
| ---------------------- | ---------------- | ----------- | ---------------------- | ------------------ |
| `api/people`           | Create new pers  | List pers | Error                  | Error              |
| `api/people/{id}`      | Error            | Get pers  | Update pers if exists| Delete people      |

## Instalar y ejecutar 🚀

Para iniciar el proyecto tienes que seguir lo siguientes pasos 

1.- Establecer las variables de entorno en la raiz del proyecto, registrar la informacion de la intancias mysql 
```
cp .env.example.yml .env.example.yml

development:
  DB_USERNAME: ""
  DB_PASSWORD: ""
  DB_DATABASE: ""
  DB_PORT: 3306
  DB_HOST: "localhost"
  DB_DIALECT: "mysql"
  SWAPI_URL: "https://swapi.py4e.com/api/"

```
2.- Crear base de datos en instancia de mysql 

```sql
CREATE DATABASE starwarsapi;
```

3- Instalar las dependencias 
```
npm install
```
4.- Ejecutar las migraciones para crear las tablas en la BD 
```
npx sequelize-cli db:migrate 
```
5.- Desplegar Aplicacion local 
```
npm start
```

## Ejecutando las pruebas ⚙️

Se realizo pruebas para validar el estado de los endpoints,para ejecutar las pruebas debemos ejecutar :

```
npm test
```

### Analice las pruebas /api/films 🔩


```js
const expect = require('chai').expect;
const request = require('supertest');

describe('Api GET response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('GET /development/api/films', (done) => {
      server.get('/development/api/films')
        .expect(200,done);
     });
    
     it('GET /development/api/films/1', (done) => {
      server.get('/development/api/films')
        .expect(200,done);
     });

  });

  describe('Api POST response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('POST /development/api/films', (done) => {
      server.post('/development/api/films')
        .send({
          "director": "Robert Popi",
          "episode_id": 12,
          "opening_crawl": "Expamploe",
          "producer": "William S.",
          "release_date": "Now",
          "title": "El retorno infinito",
          "people": [1, 2, 3]
      })
        .expect(200,done);
     });
  });

  describe('Api PATCH response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('PATCH /development/api/films/1', (done) => {
      server.patch('/development/api/films/1')
        .send({
          "director": "Robert Popi",
          "episode_id": 12,
          "opening_crawl": "Expamploe",
          "producer": "William S.",
          "release_date": "Now",
          "title": "El retorno infinito",
          "people": [1, 2, 3]
      })
        .expect(200,done);
     });
  });
```

### Analice las pruebas /api/people ⌨️

```js
const expect = require('chai').expect;
const request = require('supertest');

describe('Api GET response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('GET /development/api/people', (done) => {
      server.get('/development/api/films')
        .expect(200,done);
     });
    
     it('GET /development/api/people/1', (done) => {
      server.get('/development/api/films')
        .expect(200,done);
     });

  });

  describe('Api POST response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('POST /development/api/films', (done) => {
      server.post('/development/api/people')
        .send({
          
             "birth_year": "19 BBY",
              "eye_color": "Blue",
              "gender": "Male",
              "hair_color": "Blond",
              "height": "172",
              "homeworld": "https://swapi.py4e.com/api/planets/1/",
              "mass": "77",
              "name": "Luke Skywalker",
              "skin_color": "Fair",
              "created": "2014-12-09T13:50:51.644000Z",
              "edited": "2014-12-10T13:52:43.172000Z",
              "url": "https://swapi.py4e.com/api/people/1/"
      })
        .expect(200,done);
     });
  });
```

## Herramientas serverless 🛠️

| Plugin | Stats |
|:---------------------------|:-----------:|
| **[Webpack - `serverless-webpack`](https://github.com/serverless-heaven/serverless-webpack)** <br/> Serverless plugin to bundle your lambdas with Webpack | ![Github Stars](https://img.shields.io/github/stars/serverless-heaven/serverless-webpack.svg?label=Stars&style=for-the-badge) <br/> ![NPM Downloads](https://img.shields.io/npm/dt/serverless-webpack.svg?label=Downloads&style=for-the-badge)|
| **[Offline - `serverless-offline`](https://github.com/dherault/serverless-offline)** <br/> Emulate AWS λ and API Gateway locally when developing your Serverless project | ![Github Stars](https://img.shields.io/github/stars/dherault/serverless-offline.svg?label=Stars&style=for-the-badge) <br/> ![NPM Downloads](https://img.shields.io/npm/dt/serverless-offline.svg?label=Downloads&style=for-the-badge)|

## Despliegue en aws 📦

1.- Para generar los archivos CloudFormation ejecute:

```
npm run artifacts
```

2.- Despligue de funciones Lambda

```
sls deploy
```

Configurando adecuadamente las AWS Credentials, el comando sls deploy debería desplegar las funciones Lambda correctamente.







