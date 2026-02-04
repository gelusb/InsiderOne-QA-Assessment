export class Logger {
  static step(message: string) {
    console.log(`STEP: ${message}`);
  }

  static info(message: string) {
    console.log(`INFO: ${message}`);
  }

  static error(message: string) {
    console.error(`ERROR: ${message}`);
  }
}
