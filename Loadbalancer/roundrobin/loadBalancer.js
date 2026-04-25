const http = require("http");
const config = require("./config.json");
const roundRobin = require("./algorithms/roundRobin");

const servers = config.servers;
const PORT = config.loadBalancer.port;

const server = http.createServer((req, res) => {
  roundRobin(servers, req, res);
});

server.listen(PORT, () => {
  console.log(`Load Balancer running at http://localhost:${PORT}`);
});