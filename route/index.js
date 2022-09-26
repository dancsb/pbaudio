const schedule = require('node-schedule');

const renderMW = require('../middleware/renderMW');
const sendSSEMW = require('../middleware/sendSSEMW');

module.exports = function(app) {

    let clients = [];

    app.get(
        '/play',
        renderMW('play')
    );

    app.get(
        '/stream',
        function (req, res) {
            res.setHeader("Content-Type", "text/event-stream");
            const clientId = Date.now();

            const newClient = {
                id: clientId,
                res
            };

            clients.push(newClient);

            req.on('close', () => {
                console.log(`${clientId} Connection closed`);
                clients = clients.filter(client => client.id !== clientId);
            });
        }
    )

    app.get(
        '/set',
        function (req, res) {
            const job = schedule.scheduleJob('*/1 * * * *', function() {
                console.log('The answer to life, the universe, and everything!');
                sendSSEMW(clients);
            });
            res.send('ok');
            console.log("The storm is coming!");
        }
    )

    app.get(
        '/',
        function(req, res) {res.redirect('/play');
    })
};