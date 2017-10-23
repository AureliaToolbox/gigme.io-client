// This is to deal with node 8 deprecation of EventEmitter on process;
process.EventEmitter = process.EventEmitter || require('events');
require('require-dir')('build/tasks');
