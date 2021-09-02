# Mutation service

## Description

In this repo, I created a system to check if a dna secuence has a mutation.

The technologies used here, was Nestjs, typescript, jest for unit testing and mongo.

For use in local, you need put a env variable to MONGO_URI like this:

```bash
  export MONGO_URI=mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]

```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Testing online

for testing purpose, you can use the next url:
[link](https://secuence-mutation-wjhup.ondigitalocean.app/)

In this system you should find 2 services:

GET /summary  
POST /mutation

To create a new mutation, you can send a secuence with the next schema in the body:

```json
{
  "dna": ["ATTGT", "AATGT", "GTTGT", "ATTGT", "ATTGT"]
}
```

and the service response with 200 status code in the case the secuence haven't mutation or 403 status code if it has a mutation.

This repository was created with ❤️
