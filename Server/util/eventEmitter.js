'use strict';

var events = require('events');
var emitter = new events.EventEmitter();

module.exports = {
  listener: function (e, cb){
    emitter.addListener(e, cb);
  },
  emit: function (e){
    emitter.emit(e);
  }
}

