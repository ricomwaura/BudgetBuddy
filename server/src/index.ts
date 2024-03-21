import express, { Request, Response } from "express";
import cluster from 'cluster';
import { cpus } from 'os';
import { determineWorkers } from './utils/clusterUtils';
import art from './utils/homeArt';
import e from "express";


if (cluster.isMaster) {
    const numWorkers = determineWorkers(3);

    for (let i = 0; i < numWorkers; i++) {
        const worker = cluster.fork();
        worker.on('online', () => {
            console.log(`Worker ${worker.process.pid} is online`);
        });

        worker.on('exit', (code, signal) => {
            if (signal) {
                console.log(`Worker was killed by signal: ${signal}`)
            } else if (code != 0) {
                console.log(`Worker exited with error code: ${code}`);
            } else {
                console.log(`Worker exited successfully`);
            }

            console.log('Forking a new worker to replace the exited one...');
            cluster.fork();
        })
    }
} else {
    const app = express();

    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    app.use(express.json());

    app.get('/', (req, res) => {
        return res.send({
            message: "BudgetBuddy Server System is running.",
            api: "BudgetBuddy",
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date()
        });
    })

    const setupServer = async () => {
        app.listen(PORT, () => {
            console.log(`Server is running on: ${PORT}`);
        })
    }

    setupServer().catch(error => {
        console.log(error);
    })
}