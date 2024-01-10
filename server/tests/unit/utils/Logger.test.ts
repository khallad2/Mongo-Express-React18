// const fs = require('fs');
// const path = require('path');
// let Logger = ('../../../src/utils/Logger');
//
// describe('Logger', () => {
//     const logsDir = path.join(__dirname, '../../logs');
//
//     beforeAll(() => {
//         // Create logs directory before running tests
//         if (!fs.existsSync(logsDir)) {
//             fs.mkdirSync(logsDir);
//         }
//     });
//
//     beforeEach(() => {
//         // Clear log files before each test
//         fs.writeFileSync(path.join(__dirname, '../../logs/error.log'), '');
//         fs.writeFileSync(path.join(__dirname, '../../logs/combined.log'), '');
//     });
//
//     afterAll(() => {
//         // Optionally, you may want to clean up or delete log files after all tests
//         // fs.rmdirSync(logsDir, { recursive: true });
//     });
//
//     it('should log an error message', () => {
//         const errorMessage = 'Test error message';
//         Logger.error(errorMessage);
//
//         // Check if the error message is logged to the error.log file
//         const errorLogContent = fs.readFileSync(path.join(__dirname, '../../logs/error.log'), 'utf8');
//         expect(errorLogContent).toContain(errorMessage);
//
//         // Check if the error message is logged to the console
//         expect(console.error).toHaveBeenCalledWith(errorMessage);
//     });
//
//     it('should log an info message', () => {
//         const infoMessage = 'Test info message';
//         Logger.info(infoMessage);
//
//         // Check if the info message is logged to the combined.log file
//         const combinedLogContent = fs.readFileSync(path.join(__dirname, '../../logs/combined.log'), 'utf8');
//         expect(combinedLogContent).toContain(infoMessage);
//
//         // Check if the info message is logged to the console
//         expect(console.log).toHaveBeenCalledWith(infoMessage);
//     });
// });
