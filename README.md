# Postgres-tutorials

1. $docker run --name pg1 -detached -e POSTGRES_PASSWORD=password postgres # to run the docker container for postgres
2. $docker exec -it pg1 psql -U postgres

# partitioning 
Two type - horizontal & vertical 
vertical partitioning is implemented using techniques like normalization.
horizontal partitioning is based on a partition key (usually primary key but doesn't necessarily need to be)
Data is partitioned into multiple smaller tables based on one of the following type -
1. range , 2. list 3. hash
Usually better option than using sharding because the database here remains same , only there are multiple tables within the same db.
1. CREATE table maintable(id serial not null, grades int not null)
  PARTITIONED BY range(grades);
2. CREATE table partition0035( same as maintable);
3. CREATE table partition3560( same as maintable);
4. ALTER maintable add partition partition001000 on values from (0) to (35);
5. INSERT into maintable(grades) select floor(random()*100) from generate_series(0, 1000000); # Create a table with a million values

# Docker commands used
1. docker container prune # To remove all the stopped containers
2. docker logs -t <tag name> # logs
3. docker images #list all images
4. docker ps # only running containers
5. docker ps -a #all containers
6. docker rm <container name>

host-container port mapping.  by -p <host port>:<container port> 

# postges commands
1. \d #List of relations /tables
2. \d+
3. \du # list the existing user
4. ALTER USER <user name> WITH PASSWORD '<new password>' #to change the existing user password
5. postgres is super user
6. \q

# Consistent Hashing for sharding
in js hashring is used to implement sharding
sharding key - where the data is stored is decided by the client (implementation ) based on the sharding key
Unlike horizontal partitioning , here data is spread across multiple servers ( with same database name). User on the client side implements the sharding logic ( added js implementation file in the repo) 

Cons of Sharding -
With sharding , ATOMIC operations is not possible since data is present on different servers.
Rollback/Transaction is not possible.
Client implements the sharding logic.

# Deadlock
When two or more process are waiting for others to release the lock.
![image](https://github.com/Shweta112233/Postgres-tutorials/assets/45368129/7965f424-6510-49fd-9c7f-a13eefbd5fd8)



