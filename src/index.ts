import http from 'http'
import { getPORT } from './utils';

const PORT = getPORT();
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.write('<h1>df<h1>')
  res.end();
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
