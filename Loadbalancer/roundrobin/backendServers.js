const http = require("http");
const config = require("./config.json");

const createServer = (host, port, name) => {
  http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Response from ${name} (port ${port})`);
  }).listen(port, host, () => {
    console.log(`${name} running at http://${host}:${port}`);
  });
};

config.servers.forEach(server => {
  createServer(server.host, server.port, server.name);
});