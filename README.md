
Twitch IRC client via WebSocket, Before:

```js
var socket = new WebSocket(url);
socket.onopen = function (e) {
  socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
  socket.send("PASS SCHMOOPIIE");
  socket.send("NICK " + "justinfan8989");
  socket.send("USER " + "justinfan" + "8989");
  socket.send("JOIN " + "#twitchplayspokemon");
};
```

```js
var rxSocket = RxWebSocket(url);

rxSocket.open().subscribe(function (e) {
    socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
    socket.send("PASS SCHMOOPIIE");
    socket.send("NICK " + "justinfan8989");
    socket.send("USER " + "justinfan" + "8989");
    socket.send("JOIN " + "#twitchplayspokemon");
  });

rxSocket.message().subscribe(function (e) {
    console.log(e);
  });

rxSocket.send("");
rxSocket.close();
```

