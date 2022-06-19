import { server } from './server';
import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import './models';

const numCPUs = cpus().length;
if (cluster.isPrimary) {
  console.log(`Master process started`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });

  for (const id in cluster.workers) {
    cluster.workers[id]?.on('message', async (msg) => {
      const {workerId, command, data, id: userId} = msg
      for (const id in cluster.workers) {
          if(id == workerId) {
            cluster.workers[id]?.send({command, data, id: userId})
          }
      }
    });
  }
} else  {
    const worker = cluster.worker;
    if(worker){
      server.listen(4000, () => {
        console.log(`Server is running on port ${4000}`)
      });
      console.log(`Worker with pid ${process.pid} and id ${worker.id} has been started`);
    }
}
