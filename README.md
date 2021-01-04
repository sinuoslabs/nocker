# Nocker

## Introduction

Nocker is a lightweight command line interface that allows interaction with the default Docker development environment. Nocker is an excellent starting point to create a NodeJS application using **Postgres**, **MySQL**, **Redis** and **EventStore** without the need for prior Docker experience.

The nocker script provides a CLI with convenient methods to interact with the Docker containers defined by the `docker-compose.yml` file.


## Installation & Setup

### Global install

### Intstall nocker into existing application

## Start & Stop nocker

Nocker's docker-compose.yml file defines a Docker variety of containers that work together to help you build Laravel applications. Each of these containers is an entry within the services configuration of your docker-compose.yml file. The **main** container is the primary application container that will be serving your application.

Before starting Nocker, you should ensure that no other web servers or databases are running on your local computer. To start all of the Docker containers defined in your application's docker-compose.yml file, you should execute the up command:

```node
nocker up
```

To start all of the Docker containers in the background, you may start Nocker in "detached" mode:

```node
nocker up -d
```

Once the application's containers have been started, you may access the project in your web browser at: http://localhost.

To stop all of the containers, you may simply press Control + C to stop the container's execution. Or, if the containers are running in the background, you may use the down command:

```node
nocker down
```

## Executing Commands

When using Laravel Nocker, your application is executing within a Docker container and is isolated from your local computer. However, Nocker provides a convenient way to run various commands against your application such as arbitrary Node / NPM commands.

When reading documentation, you will often see references to [Node / NPM commands](#executing-npm-commands) that do not reference Nocker. Those examples assume that these tools are installed on your local computer. If you are using Nocker for your local Laravel development environment, you should execute those commands using Nocker:

```node
# Running NPM commands locally...
npm install

# Running NPM within project contains nocker...
nocker npm install
```

### Executing NPM commands

Node commands may be executed using the node command while NPM commands may be executed using the npm command:

```node
nocker node --version

nocker npm run prod
```

## Interacting With Databases

### MySQL

As you may have noticed, your application's docker-compose.yml file contains an entry for a MySQL container. This container uses a Docker volume so that the data stored in your database is persisted even when stopping and restarting your containers. In addition, when the MySQL container is starting, it will ensure a database exists whose name matches the value of your DB_DATABASE environment variable.

Once you have started your containers, you may connect to the MySQL instance within your application by setting your DB_HOST environment variable within your application's .env file to mysql.

To connect to your application's MySQL database from your local machine, you may use a graphical database management application such as TablePlus. By default, the MySQL database is accessible at localhost port 3306.

### Postgres

As you may have noticed, your application's docker-compose.yml file contains an entry for a Postgres container. This container uses a Docker volume so that the data stored in your database is persisted even when stopping and restarting your containers. In addition, when the MySQL container is starting, it will ensure a database exists whose name matches the value of your DB_DATABASE environment variable.

Once you have started your containers, you may connect to the Postgres instance within your application by setting your DB_HOST environment variable within your application's .env file to postgres.

To connect to your application's Postgres database from your local machine, you may use a graphical database management application such as TablePlus. By default, the Postgres database is accessible at localhost port 3306.

### Redis

Your application's docker-compose.yml file also contains an entry for a Redis container. This container uses a Docker volume so that the data stored in your Redis data is persisted even when stopping and restarting your containers. Once you have started your containers, you may connect to the Redis instance within your application by setting your REDIS_HOST environment variable within your application's .env file to redis.

To connect to your application's Redis database from your local machine, you may use a graphical database management application such as TablePlus. By default, the Redis database is accessible at localhost port 6379.
