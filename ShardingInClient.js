const { Client } = require("pg");
const crypto = require("crypto");

var HashRing = require("hashring");
var hr = new HashRing();

const clientsMap = {
  client1: new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
  }),
  client2: new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5433,
  }),
  client3: new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5434,
  }),
};

connect();
function connect() {

clientsMap.client1.connect(function (err) {
    if (err) throw err;
    console.log("Connected to client 1!");
  });
clientsMap.client2.connect(function (err) {
    if (err) throw err;
    console.log("Connected to client 2!");
  });
    clientsMap.client3.connect(function (err) {
      if (err) throw err;
      console.log("Connected to client3!");
    });
  
}



hr.add("client1");
hr.add("client2");
hr.add("client3");

async function test(url) {

  const hash = crypto.createHash("sha256").update(url).digest("base64");
  console.log(hash);

  const urlId = hash.substring(0, 5);

  const server = hr.get(urlId);
  await clientsMap[server].query("INSERT into url_shortner(url, url_id) values($1,$2)", [url, urlId])
  console.log("inserted the record into "+ server);
}

for(var i =0; i < 100; i++) {
    var url = "http://localhost:8080/test"+i;
    console.log(url);
    test(url);
}

