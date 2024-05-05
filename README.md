# Postgres-tutorials

$docker run --name pg1 -detached -e POSTGRES_PASSWORD=password postgres # to run the docker container for postgres
$docker exec -it pg1 psql -U postgres

# partitioning 
Two type - horizontal & vertical 
vertical partitioning is implemented using techniques like normalization.
horizontal partitioning is based on a partition key (usually primary key but doesn't necessarily need to be)
Data is partitioned into multiple smaller tables based on one of the following type -
1. range , 2. list 3. hash
Usually better option than using sharding because the database here remains same , only there are multiple tables within the same db.
CREATE table maintable(id serial not null, grades int not null)
  PARTITIONED BY range(grades);
CREATE table partition0035( same as maintable);
CREATE table partition3560( same as maintable);
ALTER maintable add partition partition001000 on values from (0) to (35);
INSERT into maintable(grades) select floor(random()*100) from generate_series(0, 1000000); # Create a table with a million values

**Docker commands used **
docker container prune # To remove all the stopped containers
docker logs -t <tag name> # logs
docker images #list all images
docker ps # only running containers
docker ps -a #all containers
docker rm <container name>

host-container port mapping.  by -p <host port>:<container port> 

**postges commands **
\d #List of relations /tables
\d+
\du # list the existing user
ALTER USER <user name> WITH PASSWORD '<new password>' #to change the existing user password
postgres is super user
\q

**# Consistent Hashing for sharding**
in js hashring is used to implement sharding
sharding key - where the data is stored is decided by the client (implementation ) based on the sharding key
Unlike horizontal partitioning , here data is spread across multiple servers ( with same database name). User on the client side implements the sharding logic ( added js implementation file in the repo) 

Cons of Sharding -
With sharding , ATOMIC operations is not possible since data is present on different servers.
Rollback/Transaction is not possible.
Client implements the sharding logic.

