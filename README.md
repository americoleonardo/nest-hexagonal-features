<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


  <p align="center">A Game of thrones application build with hexagonal architecture and NestJS.</p>
  <p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  </p>

## Description

This microservice is an experimental repository who you will know how basically:

* Manage data information in MongoDB;
* List an external request using axios;
* Publish and subscribe in Rabbit MQ event broker;
* Store and retrieve information in Redis cache;
* Build a beautiful swagger documentation

<center>
<a href="https://github.com/americoleonardo/nestjs-hexagonal-concept/blob/main/docs/diagram.png" target="blank"><img src="https://github.com/americoleonardo/nestjs-hexagonal-concept/blob/main/docs/diagram.png?raw=true" alt="Basic microservice architecture" /></a>
</center>

## Build With

* NestJS 7.6
* TypeORM
* NodeJS v15
* Rabbit MQ
* Redis
* MongoDB
* Docker
* Swagger


## Getting started

```
yarn install

cp .env.sample .env

cd docker && docker-compose up -d
```

Enjoy

### Run local
```
yarn start:dev
```

### Run tests
```
yarn test
```

### Run coverage
```
yarn test:cov
```

### Swagger

```
http://localhost:{you-port}/v1/api-docs
```

## License

 [MIT licensed](LICENSE).