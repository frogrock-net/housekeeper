# housekeeper

a house scheduling app

# Dev Environment Setup

### MongoDB

-   install and setup mongo

```
$ brew update
$ brew install mongodb
$ mkdir -p /data/db    # where mongo data files will live
$ sudo chown -R `id -un` /data/db    # give the dir the right permissions
```

-   run the mongo daemon with `mongod`
-   run the db shell with `mongo`

### Install gcloud and gsutil

### Run Locally

-   `$ npm run devserver`
-   make sure you have the environment variables set: `JWT_SECRET`
-   to use the graphql tool at /graphiql, will need 'mod header' chrome extension to add auth token

###
