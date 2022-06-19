import { server } from './server';
import cluster, {Worker} from 'cluster';
import { cpus } from 'os';
import process from 'process';
import UsersService from './models';
import { IUser } from 'types';

process.on('message', (msg: IUser[]) => {
  UsersService.users = msg
})

const numCPUs = cpus().length;
if (cluster.isPrimary) {
  console.log(`Master process ${process.pid}started`);
  const workers: Worker[] = [];

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    workers.push(worker);
    
    worker.on('message', ({ pid, usr }) => {
      workers.forEach((wrk) => {
        !wrk.isDead() && wrk.process.pid !== pid && wrk.send(usr)
      })
    })
  }
} else  {
  const worker = cluster.worker;
    if(worker){
      server.addListener('request', (req, res) => {
        console.log(`Worker ${worker.id} - ${process.pid}: ${res.statusCode} ${req.method} - ${req.url}`);
      })
      server.listen(4000, () => {
        console.log(`Server is running on port ${4000}`)
      });
      console.log(`Worker with pid ${process.pid} and id ${worker.id} has been started`);
    }
}
