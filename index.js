module.exports = function(env) {
	var fs = require('fs');
	var api =
	{
		init: function() {
			env.server.get('/client', function( req, res ) {
				//load index file
				print( 'client' );
				fs.readFile( __dirname + 'public/index.html', {encoding:'UTF-8'}, function( err, data ) {
					if ( err ) {
						res.send( err );
					} else {
						res.send( data );
					}
				});
			});
		}
	};
	
	return api;
}
