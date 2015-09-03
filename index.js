module.exports = function(env) {
	var fs = require('fs');
	var api =
	{
		init: function() {
			env.server.get('/client', function( req, res ) {
				//load index file
				fs.readFile( __dirname + '/public/index.html', {encoding:'UTF-8'}, function( err, data ) {
					if ( err ) {
						res.send( err );
					} else {
						res.setHeader("Content-Type", "text/html");
						res.send( data );
					}
				});
			});
		}
	};
	
	return api;
}
