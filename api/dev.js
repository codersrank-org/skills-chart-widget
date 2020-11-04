const http = require('http');
const url = require('url');

const api = require('./index');

const server = http.createServer(async (req, res) => {
  const query = url.parse(req.url, true).query;

  const context = {};
  const request = { query, url: req.url };
  await api(context, request);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.end(context.res.body);
});

server.listen(3000, () => {
  // eslint-disable-next-line
  console.log('Listening on http://localhost:3000/');
});
