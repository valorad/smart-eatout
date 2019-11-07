# Smart Eat-out Mongo Cluster
DB of app Smart Eat-out

## Usage
- Request and download the config files from this repo owner
- Specify all the [adminName] and [password] fields in `docker-compose.yml`.
- Change the all docker volumes to fit your situation.
- Generate a key file called `mongo-keyfile` with `openssl`.

  ``` shell
  $ openssl rand -base64 756 > mongo-keyfile
  ```

- Put the key file under `common` folder, then set the owner & group to `999:999` and the permission to `400`
- Comment out the `replication` and `sharding` section on EACH config-server mongod config.
- Run `docker-compose up -d`
- Comment back the `replication` and `sharding` section on EACH config-server mongod config.
- Run `docker-compose restart`
- Configure the config-server replica set
  - log in to one of the config server

  ``` shell
  $ docker exec -it smtet-mongo-config1 bash
  $ mongo 172.22.0.101:27017 -u [adminName] -p [adminPassword] --authenticationDatabase admin
  ```

  - initialize the config replica set

  ``` javascript
  > rs.initiate( { _id: "configReplSet", configsvr: true, members: [ { _id: 0, host: "172.22.0.101:27019" }, { _id: 1, host: "172.22.0.102:27019" }, { _id: 2, host: "172.22.0.103:27019" } ] } )
  ```

- Add shardings on master
  - log in to the master server

  ``` shell
  $ docker exec -it smtet-mongo-config1 bash
  $ mongo 172.22.0.100:27017 -u [adminName] -p [adminPassword] --authenticationDatabase admin
  ```

  - add shardings to master

  ``` javascript
  > sh.addShard( "172.22.0.104:27017" )
  > sh.addShard( "172.22.0.105:27017" )
  ```


## Create collections
You MUST create the database and the following collections MANUALLY before connecting back-end with the DB cluster:
`business`, `reviews`, `users`

- Log into `smtet-mongo-master` container:

  ``` shell
  $ docker exec -it smtet-mongo-master bash
  ```
  
- Connect to mongos

  ``` shell
  $ mongo 172.22.0.100:27017 -u [adminName] -p [adminPassword] --authenticationDatabase admin
  ```

- Create Database

  ``` javascript
  > use smartEatout
  > sh.enableSharding("smartEatout") // Enable shardings
  ```

- Create Collections


  ``` javascript
  let collectionsToCreate = ["business", "reviews", "users"];
  for (let col of collectionsToCreate) {
    db.createCollection(col);
    let createdCol = db.getCollection(col);
    createdCol.ensureIndex( { _id : "hashed" } );
    sh.shardCollection( `smartEatout.${col}`, { "_id" : "hashed" } );
  }

  ```

## Create Index

  ``` javascript

  > db.business.createIndex( { location : "2dsphere" } )
  > db.reviews.createIndex( { date : -1 } )

  ```

