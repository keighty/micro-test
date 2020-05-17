# UserService requirements

### Specs and TODO

Create a microservice with the following:
* [X] A User rest Resource that allows clients to create, read, update, delete a user or a list of users.
* [X] You can use a database of your choice but it’s also fine to just use a map or dictionary in memory to keep track of users by their ids.
* [ ] Use structured logging.
* [X] Add Metrics (e.g. statsd, dropwizard, prometheus, to time routes)
* [X] Write unit tests for the service.
* [X] Generate a code coverage report.
* [X] The user JSON can just be id, first name, last name, zip code, and email address.

### General thoughts, assumptions, short cuts

Thank you for the really fun exercise -- I have enjoyed dusting off some rusty synapses! 

#### Language selection
I chose node because I have been working mainly in javascript lately, I started a ruby version as well, but decided that I had better stick to a single paradigm. Since this is a CRUD app fronting a User database, I thought it reasonable to assume that it doesn't need to operate at machine-scale. I haven't taken much advantage of the language's asynchronous nature, but it would be quick to decouple the database activity from the response to the user.

#### Datastore selection
To make it simple to spin up and test the app, I decided to do without a separate database. In this example I have used a basic Map (as suggested), and would likely wrap any datastore activity in a similar UserCollection.

### StatsD
Coming from New Relic, I haven't explored many open source frameworks for instrumentation. I included statsd and basic route naming.

TODO: setup statsd server for collecting and visualizing the data

### Get started

```
$ git clone git@github.com:keighty/micro-test.git
$ npm install
$ npm start
```

### Run the unit tests

* `npm test` for a single run
* `npm run watch` for development

### Generate a code coverage report

* `npm run coverage`

### Manually test the api

```
$ ./scripts/test_api.sh createList
$ ./scripts/test_api.sh get
$ ./scripts/test_api.sh updateList
$ ./scripts/test_api.sh deleteList
...
```
