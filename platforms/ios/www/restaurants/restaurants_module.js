/* Responsible for logging a user in and sending/refreshing auth tokens */
angular.module('restaurants', ['socket', 'restaurants.config'])
.factory('restaurants', ['$rootScope', '$state', '$q', '$ionicPlatform', '$cordovaFileTransfer', '$timeout', 'socket', 'restaurants_config', function($rootScope, $state, $q, $ionicPlatform, $cordovaFileTransfer, $timeout, socket, restaurants_config) {

	var current_restaurant = null;

	var restaurants_cache = {};

	/* Downloads an image, returns that images local path if successful */
	function downloadImage(img_name)
	{
		var deferred = $q.defer();

		/* The URL should be specified in a config file */
		var url = "http://45.55.196.97:1337/static/img/restaurants/" + img_name;
		var destination_path = cordova.file.dataDirectory + img_name;
		var trust_hosts = true;
		var options = {};
		$ionicPlatform.ready(function() {
			$cordovaFileTransfer.download(url, destination_path, trust_hosts, options).then(function(image) {
				deferred.resolve(destination_path);
			}, function(error) {
				console.log(error);
				deferred.reject();
			});
		});

		return deferred.promise;
	}

	/* Returns a restaurant object if it exists. First checks the cache, then
	 * search for it online. Returns null if no restaurant exists for that id.
	 */ 
	function lookupRestaurant(restaurant_id) 
	{
		var deferred = $q.defer();

		if(restaurants_cache.hasOwnProperty(restaurant_id))
		{
			deferred.resolve(restaurants_cache[restaurant_id]);
		}
		else /* Not in cache, ask the server */
		{
			socket.emit('lookup_restuarant', restaurant_id, function(error, data) {
				if(error) { console.log(error); deferred.reject(null); }
				else /* Restaurant found */
				{
					console.log(data);
					/* Download image, set local path */
					downloadImage(data.img).then(function(image_path) {
						data.img = image_path;
						/* Save in cache */
						restaurants_cache[data.id] = data;
						deferred.resolve(data);
					}, function() { /* Have this set it to a default image */
						deferred.reject(null);
					});
				}
			});
		}

		return deferred.promise;
	};

    return {
    	lookup: function(restaurant_id) {
    		return lookupRestaurant(restaurant_id);
    	}
    };
}]);