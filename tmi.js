#!/usr/bin/env node

var url = 'ws://irc-ws.chat.twitch.tv';

//var WebSocketClient = require('rxs.io').default;
//console.log(WebSocketClient);
//
//var url = 'ws://irc-ws.chat.twitch.tv';
//var source = WebSocketClient(url);
//source.next("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
//source.next("PASS SCHMOOPIIE");
//source.next("NICK " + "justinfan");
//source.next("USER " + "justinfan" + "8989");
//source.next("JOIN " + "twitchplayspokemon");
//source.subscribe(function(x){
//  console.log("x:", x);
//});

var Rx = require('rx');

//require('rx-dom');
//socket = Rx.DOM.fromWebSocket(url);

var WebSocket = require('ws');
var socket = new WebSocket(url);

Rx.Observable.fromEvent(socket, 'open')
  .flatMap(function (it) {
    console.log(it);
    socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
    socket.send("PASS SCHMOOPIIE");
    socket.send("NICK " + "justinfan8989");
    socket.send("USER " + "justinfan" + "8989");
    socket.send("JOIN " + "#twitchplayspokemon");
    return Rx.Observable.fromEvent(socket, 'message');
  })
  .subscribe(function (it) {
    console.log(it);
  });

// ref. https://github.com/Reactive-Extensions/RxJS/issues/112#issuecomment-53477208
function SocketObservable(url) {
  var socket = new WebSocket(url);

  var observer = Rx.Observer.create(function (data) {
    if (socket.readyState === WebSocket.OPEN) { socket.send(data); }
  });

  var observable = Rx.Observable.create (function (obs) {

    socket.onopen = function (e) {
      socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
      socket.send("PASS SCHMOOPIIE");
      socket.send("NICK " + "justinfan8989");
      socket.send("USER " + "justinfan" + "8989");
      socket.send("JOIN " + "#twitchplayspokemon");
    };

    socket.onmessage = obs.onNext.bind(obs);
    socket.onerror = obs.onError.bind(obs);
    socket.onclose = obs.onCompleted.bind(obs);

    return socket.close.bind(socket);
  });

  return Rx.Subject.create(observer, observable);
}

/*
var socket = SocketObservable(url);

socket.subscribe(
  function (e) {
    console.log(e.data);
  }, function (e) {
    console.log(e);
  });
*/

/* vim: set sw=2: */
