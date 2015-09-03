var fs = require('fs');
module.exports = function(env) {
	api =
	{
		init: function() {
			env.server.get('/client', function( req, res ) {
				//load index file
				fs.readFile(__dirname + 'public/index.html', {encoding:'UTF-8'}, function( err, data ) {
					if ( err ) {
						res.send(404, 'File not found!');
					} else {
						res.send(200, data);
					}
				});
			});
		}
	};
	
	return api;
}
