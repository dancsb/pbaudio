const renderMW = require('../middleware/renderMW');

module.exports = function(app) {

    app.get(
        '/play',
        renderMW('play')
    );

    app.get(
        '/',
        function(req,res){res.redirect('/play');
    })
};