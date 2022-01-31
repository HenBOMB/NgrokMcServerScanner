const { Socket } = require('net');
const { writeFileSync } = require('fs');
const ms = require('minestat');
const data = [];

(async () => {

    var i = 10000;

    const func = server => 
    {
        data.push(server);

        if(i >= 11000)
            writeFileSync("./out.json", JSON.stringify({ out: data }, null, 2));
        else
            data.push(server);
    }

    for (;i < 11000; i++) 
    {
        scan('0.tcp.ngrok.io', i, func);
        scan('1.tcp.ngrok.io', i, func);
        scan('2.tcp.ngrok.io', i, func);
        scan('4.tcp.ngrok.io', i, func);
        scan('6.tcp.ngrok.io', i, func);
        scan('8.tcp.ngrok.io', i, func);
    }

})();

function scan(host, port, callback)
{
    const sock = new Socket();

    sock.setTimeout(1000);

    sock.on('connect', function() {
        sock.destroy();

        ms.init(host, port, () => {
                if (ms.online) 
                {
                    // console.log(`Found minecraft server: ${host}:${port}.`);
                    // console.log(`Version: ${ms.version} with ${ms.current_players} out of ${ms.max_players} players.`);
                    // console.log(`Motd: ${ms.motd}`);
                    // console.log(`Latency: ${ms.latency} ms`);
                    
                    callback({
                        host: `${host}:${port}`,
                        version: ms.version,
                        current_players: ms.current_players,
                        max_players: ms.max_players,
                        motd: ms.motd
                    });
                }

                else 
                {
                    // console.log("Server is offline!");
                }
            });
    }).on('error', () => {
        }).on('timeout', () => {
            }).connect(port, host);
}