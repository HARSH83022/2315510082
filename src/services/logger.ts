export type LoggerStack = 'frontend';
export type LoggerLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LoggerPackage =
  | 'api'
  | 'component'
  | 'hook'
  | 'page'
  | 'state'
  | 'style'
  | 'auth'
  | 'config'
  | 'middleware'
  | 'utils';

interface LogEntry {
  timestamp: string;
  stack: LoggerStack;
  level: LoggerLevel;
  packageName: LoggerPackage;
  message: string;
}

export function log(stack: LoggerStack, level: LoggerLevel, packageName: LoggerPackage, message: string) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    stack,
    level,
    packageName,
    message
  };

  const formatted = `[${entry.timestamp}] [${entry.stack}] [${entry.level.toUpperCase()}] [${entry.packageName}] ${entry.message}`;

  switch (level) {
    case 'debug':
      console.debug(formatted);
      break;
    case 'info':
      console.info(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    case 'error':
    case 'fatal':
      console.error(formatted);
      break;
    default:
      console.log(formatted);
  }
}
