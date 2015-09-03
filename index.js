module.exports = function(env) {
	var fs = require('fs');
	var restify = require('restify');
	var api =
	{
		init: function() {
			env.server.get(/^(\/.*)/, function( req, res ) {
				var path = req.params[0];
				console.log( path );
				//Reroute base to client
				if ( path === '/' ) {
					res.setHeader("Location", "/client");
					res.send( 302 );
				}
				
				//Check the incoming path and see if a file is available
				//If so serve it with static, if not found try index.html
				fs.stat( __dirname + '/public' + path, function( err, stat ) {
					if ( stat != null && stat.isFile() ) {
						//Go static
						restify.serveStatic({
							directory: __dirname + '/public',
							"default": __dirname + '/public/index.html'
						});
					} else {
						//Serve up index.html
						fs.readFile( __dirname + '/public/index.html', {encoding:'UTF-8'}, function( err, data ) {
							res.setHeader("Content-Type", "text/html");
							res.send( 200 , data );
						});
					}
				});
			});
		}
	};
	
	return api;
}
