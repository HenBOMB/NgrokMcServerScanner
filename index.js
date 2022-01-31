const net = require('net');
const { writeFileSync } = require('fs');
const ms = require('minestat');
const data = [];
var i;

/*
Mc server ping:
    https://github.com/FragLand/minestat
Ngrok scanner:
    https://github.com/moistp1ckle/ngrok_MCS
*/

(async () => {

    for (i = 10000; i < 11000; i++) 
    {
        check('0.tcp.ngrok.io', i, callMe);
        check('1.tcp.ngrok.io', i, callMe);
        check('2.tcp.ngrok.io', i, callMe);
        check('4.tcp.ngrok.io', i, callMe);
        check('6.tcp.ngrok.io', i, callMe);
        check('8.tcp.ngrok.io', i, callMe);
    }
})();

function callMe(server)
{
    data.push(server);

    if(i >= 11000)
    {
        writeFileSync("./out.json", JSON.stringify({ out: data }, null, 2));
    }
    else
    {
        data.push(server);
    }
}

function check(host, port, callback)
{
    const sock = new net.Socket();

    sock.setTimeout(1000);

    sock.on('connect', function() {
        sock.destroy();

        ms.init(host, port, function(result)
        {
            if(ms.online)
            {
                // console.log("___________________")
                // console.log("Found minecraft server: " + `${host}:${port}.`);
                // console.log("Version: " + ms.version + " with " + ms.current_players + " out of " + ms.max_players + " players.");
                // console.log("Motd: " + ms.motd);
                // console.log("___________________")
                // console.log("Latency: " + ms.latency + "ms");
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

    }).on('error', function(e) {
    }).on('timeout', function(e) {
    }).connect(port, host);
}