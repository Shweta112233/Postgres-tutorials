# Postgres-tutorials

1. $docker run --name pg1 -detached -p 5432:5432 -e POSTGRES_PASSWORD=password postgres # to run the docker container for postgres
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
Example - ![image](https://github.com/Shweta112233/Postgres-tutorials/assets/45368129/7965f424-6510-49fd-9c7f-a13eefbd5fd8)
Here transaction 1 begin and insert id 1 (id is primary key in table test). Even though the transaction is not commited, postgres acquires an exclusive lock on id 1
transaction 2 begin and insert id 2 & acquire exclusive lock on 2. so no other transaction can insert 2 into table.
transaction 1 inserts id 2 and now is waiting to acquire exclusive lock on 2. Transaction 2 is holding exclusive lock on id 2 so transaction 1 waits.
transaction 2 tries to insert id 1 and waits to acquire lock on 1. transaction 1 is holding exclusive lock on id 1 so transaction 1 waits. Both are waiting on each other to release the resource. this is a deadlock
postgres detects the deadlock and immediately fails and rollback the transaction 2 since it entered last in the deadlock & transaction 1 succedds with inserting id 2.

# Concurrency Control Mechanism
1. **two phase locking (2pl)** , in first phase you acquire acquire ... locks, in second phase you release release .. locks.
2. row level locking command -> select * from bookings where id = 1 **for update**. This way the transaction acquires an exclusive lock on the row object. Now other transaction needs to wait to acquire lock. double booking problem.
3. ![image](https://github.com/Shweta112233/Postgres-tutorials/assets/45368129/78760ff2-cd50-462e-9cf8-24874d1a580c)

Ways of solving the double booking problem 
1. Exclusive lock using the for update statement.
2. database also acquires lock implicitly when same row record is modified. Example in image below
3. here transaction begins & update command -> **update bookings set isbooked = 1, name = 'shweta' where id = 1 and isbooked = 0;** -> acquires lock on the record with id = 1, untill it commits , the other transaction waits for acquire lock to update the row record. in this example , the transaction by default reads the "read committed" transaction so the second transaction doesn't find the isbooked = 1 and therefore no update is done. This is specific to postgres.
4. ![image](https://github.com/Shweta112233/Postgres-tutorials/assets/45368129/e59550b3-c36c-42cf-8b1c-5c94433fc5f7)

pagination with Offset is very slow
ConnectionPool in java springboot - HikarCP default.  If you use the spring-boot-starter-jdbc or spring-boot-starter-data-jpa “starters”, you automatically get a dependency to HikariCP.
Bydefault the config for connection pool size is 10.







