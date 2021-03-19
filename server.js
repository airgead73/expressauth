const { createServer, Server } = require('http');
const app = require('./_server/app');
const PORT = process.env.PORT;
const server = createServer(app);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
