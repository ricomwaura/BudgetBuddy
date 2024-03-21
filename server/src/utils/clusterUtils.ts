import os from 'os';

/**
 * Determines the number of workers to fork based on available CPUs and a maximum limit.
 * @param {number} maxWorkers - The maximum number of worker process to allow.
 * @returns {number} The calculated number of workers to fork, which is the least of available CPUs or maxWorkers.
 */
function determineWorkers(maxWorkers: number): number {
    // Determine the number of CPUs available
    const numCPUs = os.cpus().length;

    // Calculate the number of workers to fork, which should be the least of maxWorkers or numCPUs
    return Math.min(maxWorkers, numCPUs);
}

export { determineWorkers };
