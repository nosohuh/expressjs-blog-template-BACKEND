import winston from "winston"
import chalk from "chalk"

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { service: 'blog-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
    new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
  ],
});

export default class Log_Login {
  public static commonLog = (message: any,
    level: string,
    savelog: boolean,
    secondColor:chalk.Chalk,
    firdcolor:chalk.Chalk
    ) => {
    
    if (savelog) {
      logger.log({
        level: level,
        message: message
      })
    }
  }
  public static info = (message: any, saveLog: boolean) => {
    Log_Login.commonLog(message, 'info', saveLog, chalk.blueBright, chalk.bgCyanBright);
  };
  public static warn = (message: any, saveLog: boolean) => {
    Log_Login.commonLog(message, 'warn', saveLog, chalk.blueBright, chalk.bgCyanBright);
  };
  public static error = (message: any, saveLog: boolean) => {
    Log_Login.commonLog(message, 'error', saveLog, chalk.blueBright, chalk.bgCyanBright);
  };
};

