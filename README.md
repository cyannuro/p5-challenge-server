# P5 Challenge Server

Client repo: https://github.com/cyannuro/p5-challenge-client

##### Prerequisites:

* NodeJS (v12+ to run) and yarn (or npm instead)
* PostgreSQL

##### Setting up:

```sh
git clone https://github.com/cyannuro/p5-challenge-server.git
cd p5-challenge-server
```

To install packages, run:

```sh
yarn
```

Create a .env file in root folder with the following structure

```sh
NODE_ENV=development
PORT=4000
DB=airport
DBHOST=
DBUSER=
DBPASS=
```

Database setup

```sh
yarn db:generate
```

Serving the app

```sh
yarn dev
```
