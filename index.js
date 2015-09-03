module.exports = function(env) {
	var fs = require('fs');
	var restify = require('restify');
	var api =
	{
		init: function() {
			env.server.get(/^(\/.*)/, function( req, res, next ) {
				var path = req.params[0];
				
				//Reroute base to client
				if ( path === '/' ) {
					res.setHeader("Location", "/client");
					res.send( 302 );
				}

				//Check the incoming path and see if a file is available
				fs.stat( __dirname + '/public' + path, function( err, stat ) {
					if( ( stat != null ) && ( stat.isFile() ) ) {
						//Get the file and return
						fs.readFile( __dirname + '/public/index.html', {encoding:'UTF-8'}, function( err, data ) {
							if ( err ) {
								res.send( err );
							} else {
								res.setHeader("Content-Type", "text/html");
								res.send( 200, data );
							}
						}
					} else {
						//Nothing found - static?
						next();
					}
				} );
			}, restify.serveStatic({
				directory: __dirname + '/public',
				"default": __dirname + '/public/index.html'
			}));
		}
	};
	
	return api;
}
