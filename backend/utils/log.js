import chalk from "chalk";

export class Log {
  static success(message) {
    return console.log(chalk.green(message));
  }

  static error(message) {
    return console.log(chalk.red(message));
  }
}
