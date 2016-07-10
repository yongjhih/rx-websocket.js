module.exports = RxWebSocket;
function RxWebSocket(url) {
  var WebSocket = require('ws');
  var Rx = require('rx');
  var socket = new WebSocket(url);
  this.socket = socket; // FIXME: duplicated, for public
  var observer = Rx.Observer.create(function (data) {
    if (socket.readyState === WebSocket.OPEN) { socket.send(data); }
  });

  this.open = function () {
    var observable = Rx.Observable.create(function (sub) {
        socket.onopen = function (e) {
          sub.onNext(socket);
          sub.onCompleted();
        };
    });
    return Rx.Subject.create(observer, observable);
    //return observable;
  };

  this.message = function () {
    var observable = Rx.Observable.create(function (sub) {
      socket.onmessage = sub.onNext.bind(sub);
      socket.onerror = sub.onError.bind(sub);
      socket.onclose = sub.onCompleted.bind(sub);
      return socket.close.bind(socket);
    });

    return Rx.Subject.create(observer, observable);
    //return observable;
  };

  // Please use rxSocket.next(msg) instead
  this.send = function (msg) {
    if (socket.readyState === WebSocket.OPEN) { socket.send(data); }
  };

  // Or wait for auto closing when message() subscriptoin unsubscribed or onCompleted
  this.close = function () {
    socket.close();
  }
}
