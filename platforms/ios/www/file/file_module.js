/* Provides a service that allows for easy file opening/creating/reading/writing etc...
** because we are going to be reusing this code a lot for this application and I'd rather 
** have the bloat and copy paste errors.
*/
angular.module('file', ['ionic', 'ngCordova'])
/* The 'file' service */
.factory('fs', function($http, $cordovaFile, $q) {

	/* All files are cached here using their file_name as a key */
	var files = {};

	/* Creates a new emtpy file with file name 'file_name'*/
	function createEmptyFile(file_name) 
	{
		var deferred = $q.defer();

		/* Check if we have a cached version of the file */
		if(files.hasOwnProperty(file_name))
		{
			console.log('File: ' + file_name + ' found in cache');
			deferred.reject();
			return deferred.promise;
		}

		/* Check if this file exists */
		$cordovaFile.checkFile(cordova.file.dataDirectory, file_name).then(function(result) {
	    	console.log(file_name + ' exists!');
	    	deferred.reject();
			return deferred.promise;
	  	}, function(err) { /* File not found */
	  		$cordovaFile.createFile(cordova.file.dataDirectory, file_name, true).then(function(data) {
	  			console.log('Successfully created ' + file_name);
	  			deferred.resolve();
	  		}, function(err) {
	  			console.error('Error creating file.\nCode: ' + err.code);
				deferred.reject();
	  		});
	  	});

	  	return deferred.promise;
	};

	/* Creates a new file with file name 'file_name' filled with the data
	 * 'file_data'.
	 */
	function createFileFromData(file_name, file_data) 
	{
		var deferred = $q.defer();

		/* Check if we have a cached version of the file */
		if(files.hasOwnProperty(file_name))
		{
			console.log('File: ' + file_name + ' found in cache');
			deferred.reject();
			return deferred.promise;
		}

		/* Check if this file exists */
		$cordovaFile.checkFile(cordova.file.dataDirectory, file_name).then(function(result) {
	    	console.log(file_name + ' exists!');
	    	deferred.reject();
			return deferred.promise;
	  	}, function(err) { /* File not found */
	  		$cordovaFile.createFile(cordova.file.dataDirectory, file_name, true).then(function(data) {
	  			console.log('Successfully created ' + file_name);
	  			/* See if we have to write data to the file */
	  			if(file_data)
	  			{
	  				console.log("Writing file data to new file.");
	  				$cordovaFile.writeFile(cordova.file.dataDirectory, file_name, JSON.stringify(file_data), true).then(function(result) {
						console.log('Successfully wrote data to ' + file_name);
						/* Initialize data */
						files[file_name] = file_data;
						deferred.resolve(file_data);
					}, function(err) {
						console.log('Error writing to file.\nCode: ' + err.code);
						deferred.reject();
					});
	  			}
	  			else { deferred.resolve(); }

	  		}, function(err) {
	  			console.error('Error creating file.\nCode: ' + err.code);
				deferred.reject();
	  		});
	  	});

	  	return deferred.promise;
	};

	/* Returns the data inside a file */
	function getFileData(file_name)
	{
		var deferred = $q.defer();

		/* Check if we have a cached version of the file */
		if(files.hasOwnProperty(file_name))
		{
			console.log('File: ' + file_name + ' found in cache');
			deferred.resolve(files[file_name]);
			return deferred.promise;
		}

		$cordovaFile.checkFile(cordova.file.dataDirectory, file_name).then(function(result) {
	    	console.log(file_name + ' exists, loading data from it');
	    	$cordovaFile.readAsText(cordova.file.dataDirectory, file_name).then(function(file_data) {
	    		console.log('Successfully read ' + file_name);
	    		/* Initialize Data */
	    		try 
	    		{
	    			files[file_name] = JSON.parse(file_data);
	    		} 
	    		catch(error) 
	    		{
	    			console.error('Could not parse JSON from file data');
	    			console.error(error);
	    			deferred.reject();
	    			return deferred.promise;
	    		}
				deferred.resolve(files[file_name]);
	    	}, function(err) {
	    		console.log('Failed to read ' + file_name);
	    		console.log('Error Code: ' + err.code);
	    		deferred.reject();
	    	});
	  	}, function(err) {
	  		console.log('Failed to find ' + file_name + ' in the file system.');
	  		console.log('Error Code: ' + err.code);
	  		deferred.reject();
	  	});

		return deferred.promise;
	};

	/* Write file_data to file_name (replacing not appending contents)
	** Expects JS Obj as data so it can 'stringify it'.
	*/ 
	function writeFile(file_name, file_data)
	{
		var deferred = $q.defer();

		$cordovaFile.checkFile(cordova.file.dataDirectory, file_name).then(function(result) {
			/* Update the cache */
			files[file_name] = file_data;
			deferred.resolve();
			/* Write to disk */
			$cordovaFile.writeFile(cordova.file.dataDirectory, file_name, JSON.stringify(file_data), true).then(function(result) {
				console.log('Successfully updated ' + file_name);
				deferred.resolve();
			}, function(err) {
				console.log('Error writing file.\nCode: ' + err.code);
				deferred.reject();
			});
	    }, function(err) {
	    	console.error('File not found. Cannot write ' + file_name + '\n Code: '+err.code);
	    	deferred.reject();
	    });
		
		return deferred.promise;
	};

	/* Deletes a file */
	function deleteFile(file_name)
	{
		var deferred = $q.defer();
		/* Delete from FS */
		$cordovaFile.removeFile(cordova.file.dataDirectory, file_name).then(function() {
			console.log('Successfully deleted ' + file_name);
			/* Remove from cache */
			delete files[file_name];
			deferred.resolve();
		}, function(err) { console.log('Failed to delete ' + file_name); console.log('Error code: '+err.code);  deferred.reject(); });
		return deferred.promise;
	}

	/* Helper function for parsing JSON without fatalities */
    function parse(json_string)
    {
        var obj = null;
        try { obj = JSON.parse(json_string); }
        catch(error) { console.error('Could not parse JSON\nCode: '+error); }
        return obj;
    }


	return {
		create: function(file_name) {
			return createEmptyFile(file_name);
		},
		createWithData: function(file_name, file_data) {
			return createFileFromData(file_name, file_data);
		},
		open: function(file_name) {
			return getFileData(file_name);
		},
		save: function(file_name, file_data) {
			return writeFile(file_name, file_data);
		},
		delete: function(file_name) {
			return deleteFile(file_name);
		}
	}
});
