const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});


proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err.message);
  res.writeHead(502);
  res.end("Bad Gatew+ay");
});


const createWeightedList = (servers) => {
  const list = [];
  servers.forEach(server => {
    for (let i = 0; i < server.weight; i++) {
      list.push(server);
    }
  });
  return list;
};

let current = 0;

const roundRobin = (servers, req, res) => {
  const weightedServers = createWeightedList(servers);

  const target = weightedServers[current];
  console.log(`Forwarding to ${target.name}`);

  current = (current + 1) % weightedServers.length;

  proxy.web(req, res, {
    target: `http://${target.host}:${target.port}`
  });
};

module.exports = roundRobin;