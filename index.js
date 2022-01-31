const net = require('net');
const { writeFileSync } = require('fs');
const ms = require('minestat');
const data = [];
var i;

(async () => {

    for (i = 10000; i < 11000; i++) 
    {
        test('0.tcp.ngrok.io', i, run);
        test('1.tcp.ngrok.io', i, run);
        test('2.tcp.ngrok.io', i, run);
        test('4.tcp.ngrok.io', i, run);
        test('6.tcp.ngrok.io', i, run);
        test('8.tcp.ngrok.io', i, run);
    }
})();

function run(server)
{
    data.push(server);

    if(i >= 11000)
        writeFileSync("./out.json", JSON.stringify({ out: data }, null, 2));
    else
        data.push(server);
}

function test(host, port, callback)
{
    const sock = new net.Socket();

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