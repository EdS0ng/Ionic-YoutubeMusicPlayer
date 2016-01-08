'use strict';

let ytdl = require('ytdl-core');
let ffmpeg = require('fluent-ffmpeg');
let emitter = require('./eventEmitter');

var baseUrl = 'https://www.youtube.com/watch?v=';

function chooseFormat (format){
  return format.container ==='flv';
}

function stream (id, res){

  var videoUrl = baseUrl+id;
  var command = ffmpeg();

  command.input(ytdl(videoUrl, {filter: function (format){
    return format.container ==='flv';
  }}))
  .format('mp3').pipe(res);

  command.on('error', function (err){
    console.log(err);
  })
  command.on('start', function (){
    console.log('start');
    emitter.emit('start');
  })
  command.on('end', function (){
    console.log('end');
    emitter.emit('end');
  })

  return command;

}

module.exports = stream;



// ytdl.getInfo(videoUrl, function(err,data){
  //   console.log('got info');
  //   var info = JSON.stringify(data);
  //   fs.writeFile('./info', info, function (){
  //    console.log('done');
  //   });
// }
