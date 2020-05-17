# UserService requirements

## Specs and TODO

Create a microservice with the following:
* [X] A User rest Resource that allows clients to create, read, update, delete a user or a list of users.
* [X] You can use a database of your choice but it’s also fine to just use a map or dictionary in memory to keep track of users by their ids.
* [X] The user JSON can just be id, first name, last name, zip code, and email address.
* [X] Use structured logging.
* [X] Add Metrics (e.g. statsd, dropwizard, prometheus, to time routes)
* [X] Write unit tests for the service.
* [X] Generate a code coverage report.

## Get started

```
$ git clone git@github.com:keighty/micro-test.git
$ npm install
$ npm start
```

## Run the unit tests

* `npm test` (for a single run)
* `npm run watch` (for development)

## Generate a code coverage report

* `npm run coverage` (generated on every test run)

## Manually test the api

```
$ ./scripts/test_api.sh createList
$ ./scripts/test_api.sh get
$ ./scripts/test_api.sh updateList
$ ./scripts/test_api.sh deleteList
...
```

-----------------------------

### General thoughts, assumptions, short cuts

Thank you for the really fun exercise -- I have enjoyed dusting off some rusty synapses! 

#### Language selection
I chose node because I have been working mainly in javascript lately, I started a ruby version as well, but decided that I had better stick to a single paradigm. Since this is a CRUD app fronting a User database, I thought it reasonable to assume that it doesn't need to operate at machine-scale. I haven't taken much advantage of the language's asynchronous nature, but it would be quick to decouple the database activity from the response to the user.

#### Datastore selection
To make it simple to spin up and test the app, I decided to do without a separate database. In this example I have used a basic Map (as suggested), and would likely wrap any datastore activity in a similar UserCollection.

### Structured logging
I focused on the places where logs should occur, rather than on a cool new technology to collect them (Winston in this case). I am using the following guidelines:

* warn: this may be an error if it occurs too often
* error: this is a bad state

I chose to warn whenever an action was taken, and that might be a bit aggressive: warning when a user is updated or deleted is great for auditing purposes, but logging when a user isn't found in the collection may generate a ton of noise. If this service were available to the internet as a public API, too many missing users might be a signal of an attack, or it could be an engineer like me who hammers their way through without reading error messages until the tenth time my call doesn't work.

### StatsD
Coming from New Relic, I haven't explored many open source frameworks for instrumentation! I included statsd and basic route naming, but not much else. Happy to learn more here!

TODO: setup statsd server for collecting and visualizing the data

### Unit tests and coverage
Unit tests are my favourite kind of tests. I read a great book a few years ago called Testing with Javascript, and I really enjoy structuring code so that it is easy to test. I confess, I don't always write the tests first, but rest assured -- if there is business logic, there will be sufficient test coverage.
