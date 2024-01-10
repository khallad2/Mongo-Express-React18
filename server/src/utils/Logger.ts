import fs from 'fs';
import path from 'path';

// Log file paths
const errorLogPath = path.join(__dirname, '../../logs/error.log');
const combinedLogPath = path.join(__dirname, '../../logs/combined.log');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

/**
 * Custom logger for logging to console and files.
 */
class Logger {
    constructor() {
    }

    /**
     * Log an error message.
     * @param {string} message - The error message.
     */
    static error(message: string): void {
        console.error(message);
        this.logToFile(errorLogPath, message);
    }

    /**
     * Log an info message.
     * @param {string} message - The info message.
     */
    static info(message: string): void {
        console.log(message);
        this.logToFile(combinedLogPath, message);
    }

    /**
     * Log a message to a file.
     * @param {string} filePath - The file path.
     * @param {string} message - The message to log.
     */
    private static logToFile(filePath: string, message: string): void {
        const logEntry = `[${new Date().toISOString()}] ${message}\n`;

        // Append to the log file
        fs.appendFileSync(filePath, logEntry, 'utf8');
    }
}

export default Logger;
