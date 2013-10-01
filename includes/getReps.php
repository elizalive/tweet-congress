<?php

$zip = $_POST['zip'];
$q = $_POST['q'];

// If there's a zip, get the whois info
if($zip) {
	/* Since the project says to do a CURL request, I will instead of this:
	$twitterJSON = file_get_contents("http://whoismyrepresentative.com/getall_mems.php?zip=$zip&output=json");
	print $twitterJSON; */
	
	// Create the url (add on the JSON attribute)
	$url  = "http://whoismyrepresentative.com/getall_mems.php";
	$url .= "?zip=$zip";
	$url .= "&output=json";
		
	// cURL initiation
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_URL, $url);
	
	// Execute & Close
	$curlResponse = curl_exec($ch);
	curl_close($ch);
	
	// Print it out!
	print $curlResponse;
}
else if($q) { // Otherwise, get Twitter stuff
	include('key.php');
	
	// Play with that array!
	$state = array_pop($q);
	
	// Create the url (add on the JSON attribute)
	$url  = "http://services.sunlightlabs.com/api/legislators.getList?apikey=$key";
	$url .= "&state=$state";

	// Add it all together!
	foreach($q as $key => $name) {
		if($key%2 == 0)
			$url .= "&firstname=$name";
		else
			$url .= "&lastname=$name";
	}
		
	// cURL initiation
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_URL, $url);
	
	// Execute & Close
	$curlResponse = curl_exec($ch);
	curl_close($ch);
	
	// Print it out!
	print $curlResponse;
}
else {
	print "Invalid.";
}

?>