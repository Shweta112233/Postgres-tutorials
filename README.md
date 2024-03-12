# Postgres-tutorials
# to run the docker container for postgres
$docker run --name pgacid -d postgres:13

# to spin the docker container for mysql
1. docker run --name <container_name> -p 3306:3306 -v mysql_volume:/var/lib/mysql/ -d -e "MYSQL_ROOT_PASSWORD=test" mysql
2. docker exec -it <container_name> bash
3. mysql -u root -p
