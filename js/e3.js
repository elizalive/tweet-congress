$(document).ready(function() {
	// Auto-select the input box
	$('#zip').focus();
	// Create submit function
	$('#submit').bind('click', function(e) {
		e.preventDefault();
		// Get the zip code
		var zip = $('#zip').val();
		console.log(zip);
		// Pass it on to that API...
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: 'includes/getReps.php',
			data: { 'zip' : zip }, 
			success: function(data) {
				console.log(data);
				// Get the state
				var state = data.results[0].state;
				// Parse: Once for names
				var repNames = new Array();
				for(x=0; x<data.results.length; x++) {
					// Add names in "Last First"
					repNames.push(data.results[x].name.split(' ').reverse().join(' '));
				}
				// Sort this mess
				repNames = repNames.sort();
				// Create the 'q'
				var q = new Array();
				for(x=0; x<repNames.length; x++) {
					var last = repNames[x].split(' ')[0];
					var first = repNames[x].split(' ')[1];
					q.push(first, last);
				}
				// Add the state so everything checks out
				q.push(state);
				console.log(q);
				// Pass it on to that other API...
				$.ajax({
					type: 'post',
					dataType: 'json',
					url: 'includes/getReps.php',
					data: { 'q' : q }, 
					success: function(data) {
						console.log(data);
						// Print everything out
						$('#reps').html('');
						for(x=0; x<data.response.legislators.length; x++) {
							var twitter = data.response.legislators[x].legislator.twitter_id;
							var name = data.response.legislators[x].legislator.firstname;
							console.log(name + ' ' + twitter + ' ' + repNames[x]);
							if(twitter)
								$('#reps').append('<li>' + repNames[x] + '<a href="http://twitter.com/' + twitter + '">' + twitter + '</a></li>');
							else
								$('#reps').append('<li>' + repNames[x] + '<img src="img/fail-whale.png" alt="No Twitter Found!" /></li>');
						}
					},
					error: function(data) {
						console.log('Error (Sunlight Services): ' + data);
					}
				});
			},
			error: function(data) {
				console.log('Error (whoismyrepresentative): ' + data);
			}
		});
	});
	// Go ahead and make magic happen!
	$('#submit').trigger('click');
});