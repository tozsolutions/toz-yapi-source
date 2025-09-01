import { config } from '../config/config';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface Logger {
  error: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  debug: (message: string, ...args: unknown[]) => void;
}

const shouldLog = (level: LogLevel): boolean => {
  const levels: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  };
  
  const currentLevel = levels[config.logLevel as LogLevel] ?? levels.info;
  const messageLevel = levels[level];
  
  return messageLevel <= currentLevel;
};

const formatMessage = (level: LogLevel, message: string, ...args: unknown[]): string => {
  const timestamp = new Date().toISOString();
  const formattedArgs = args.length > 0 ? ` ${JSON.stringify(args)}` : '';
  return `[${timestamp}] ${level.toUpperCase()}: ${message}${formattedArgs}`;
};

export const logger: Logger = {
  error: (message: string, ...args: unknown[]): void => {
    if (shouldLog('error')) {
      console.error(formatMessage('error', message, ...args));
    }
  },
  
  warn: (message: string, ...args: unknown[]): void => {
    if (shouldLog('warn')) {
      console.warn(formatMessage('warn', message, ...args));
    }
  },
  
  info: (message: string, ...args: unknown[]): void => {
    if (shouldLog('info')) {
      console.info(formatMessage('info', message, ...args));
    }
  },
  
  debug: (message: string, ...args: unknown[]): void => {
    if (shouldLog('debug')) {
      console.debug(formatMessage('debug', message, ...args));
    }
  },
};