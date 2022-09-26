module.exports = function send(clients) {

    console.log("HOHOHO HORGÁSZ");
    clients.forEach(client => client.res.write('data: ' + 'hello from sirály\n\n'));

};