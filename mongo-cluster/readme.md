# Smart Eat-out Mongo Cluster
DB of app Smart Eat-out

## Usage
- Request and download the config files from this repo owner
- Specify all the [adminName] and [password] fields in `docker-compose.yml`.
- Change the all docker volumes to fit your situation.
- Generate a key file called `mongo-keyfile` with `openssh`. Put the key file under `common` folder, then set the owner & group to `999:999` and the permission to 400
- Comment out the `replication` and `sharding` section on EACH config-server mongod config.
- Run `docker-compose up -d`
- Comment back the `replication` and `sharding` section on EACH config-server mongod config.
- Run `docker-compose restart`
- Configure the config-server replica set
- Add shardings on master