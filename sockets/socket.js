const { io } = require('../index');

var clientId = 0;

class Letter {
    constructor(data) {
        this.msg = data.msg;
        this.socket = data.socket;
        this.id = data.id;
        this.user = data.user;
    }

    toString() {
        return JSON.stringify(this, this.replacer);
    }

    replacer(key, value) {
        // we don't need to send the socket object to the client
        if (key == "socket") return undefined;
        else return value;
    }
}

io.on('connection', (client) => {
    console.log("Connected");

    clientId++;
    var letter;

    client.on('message', (data) => {
        console.log(`Texto agarrado: `, data);
        /*
        data = JSON.parse(data);

        console.log(`Texto agarrado: "${data.msg}"`);

        letter = new Letter({
            socket: client,
            id: clientId,
            msg: data.msg,
            user: data.user
        });
        client.broadcast.emit('message', letter.toString());
        */
    });

    client.on('disconnect', () => {
        console.log(`Disconnected.`);
    });
});