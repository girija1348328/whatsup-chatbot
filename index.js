const { Client} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios')


const client = new Client();


client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
});

client.on('message',message=> {
    console.log('Client is ready!');

    const content = message.body
    client.getChats().then(chats => {
        const myGroup = chats.find((chat) => chat.name === "Testing")
        client.sendMessage(myGroup.id._serialized, 'hello this is an automated message')

        if (content === 'hello') {
            client.sendMessage(myGroup.id._serialized, 'hii');
        }
        else if (content === 'how are you') {
            client.sendMessage(myGroup.id._serialized, 'i am fine,What abt you');
        }
    })
});


client.on('message', async message => {

    const content = message.body
    if (content === "plz joke") {
        const joke = await axios("https://v2.jokeapi.dev/joke/Any?safe-mode")
            .then(res => res.data)

        const jokeMsg = await client.sendMessage(message.from, joke.setup || joke.joke)
        if (joke.delivery) setTimeout(function () { jokeMsg.reply(joke.delivery) }, 5000)
    }
});

client.initialize();