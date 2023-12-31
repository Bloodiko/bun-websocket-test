# Bun WebSocket Server Test

This is a test of the Bun WebSocket server.
I tried to figure out how to create two different WebSocket servers on the same Port. 

Current Solution: 

WebSocket is created with a "type" parameter.

Based on the type, the one real WebSocket server just calls the handler of the two "virtual" WebSocket servers.


## How to run

```bash
bun index.ts
```

## How to test

In the browser, open the console and type:

```javascript
var ws = new WebSocket("ws://localhost:3000/ws/bot");
var mgmtws = new WebSocket("ws://localhost:3000/ws/mgmt");

ws.onmessage = function (event) {
    console.log(event.data);
};

mgmtws.onmessage = function (event) {
    console.log(event.data);
};

```


Check the Network Tab to view the message if it worked. I kept the handler pretty basic. 



# bun-websocket-test

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.