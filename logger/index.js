import log4js from 'log4js';

log4js.addLayout('json', function(config) {
  return function(logEvent) { return JSON.stringify(logEvent) + config.separator; }
});

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    debug: {
      type: 'dateFile',
      filename: './debug/app.log',
      daysToKeep: 30,
      pattern: 'yyyy-MM-dd-hh',
    },
    json: {
      type: 'dateFile',
      filename: './json/app.log',
      daysToKeep: 30,
      pattern: 'yyyy-MM-dd-hh',
      layout: {type: 'json', separator: ','},
    },
    filtered_console: {
      type: 'logLevelFilter',
      appender: 'console',
      level: 'info',
    },
  },
  categories: {
    console: { appenders: ['filtered_console'], level: 'info' },
    debug:   { appenders: ['debug'], level: 'debug' },
    json:    { appenders: ['json'], level: 'info' },
    default: { appenders: ['filtered_console', 'debug'], level: 'debug' },
  }
});
const logger = log4js.getLogger();
const console = log4js.getLogger('console');
const debug = log4js.getLogger('debug');
const json = log4js.getLogger('json');
export {logger, console, debug, json};
