module.exports = function(env) {
	api =
	{
		init: function() {
			env.server.get('/client', function( req, res ) {
				res.send('Rock me like a Burritocane.');
			});
		}
	};
	
	return api;
}
