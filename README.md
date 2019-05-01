# Bem-vindo a aplicação Country-Codes SPA
Essa é uma aplicação webservice dockerized. São dois containers docker integrados (stack): um webservice, baseado em nodejs, e outro, um banco de dados mongodb.  Baseada nessas [instruções](https://github.com/citartech/job-vacancies/).

## Dependências
É necessário ter instalado o *docker*, *docker-compose* e o *git*.

>Instruções de como instalar o [docker](https://docs.docker.com/install/) e o [docker-compose](https://docs.docker.com/compose/install/).

## Começo rápido
* 1º) Clone o repositório com o comando:
```sh
$ git clone https://github.com/chiarelli/country-codes-spa.git
```
* 2º) Acesso o diretório do aplicativo, crie o diretório `data` e mude o dono para `user#1001`
```sh
$ cd country-codes-spa
$ mkdir data
$ sudo chown 1001 data
```
* 3º) Construa e inicie a aplicação dockerized com o *docker-compose*:
```sh
$ docker-compose build
$ docker-compose up
```
* 4º) Acesse a aplicação em [http://localhost:8080/](http://localhost:8080/)
