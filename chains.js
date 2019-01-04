function chains() {
	$.getJSON('https://allorigins.me/get?url=' + encodeURIComponent('http://www.dot.ca.gov/hq/roadinfo/display.php?page=i80') + '&callback=?', function(data){
		// let i80 = data.contents.split('pre>')[1].split("\n")
		let i80 = JSON.stringify(data.contents.split('pre>')[1])
		// let i80 = 'SIERRA NEVADA] NO TRAFFIC'
		let noChains = /SIERRA NEVADA]\\r\\n(\s+?)(?=NO TRAFFIC)/
		let FWD = /SIERRA NEVADA]\\r\\n(\s+?)(?=4-WHEEL-DRIVE)/
		let yesChains = /SIERRA NEVADA]\\r\\n(.+?)(?=CHAINS)/
		let closure = /SIERRA NEVADA]\\r\\n(\s+?)(?=IS CLOSED)/
		// console.log(noChains.exec(i80));
	    // console.log(i80);
	    if (noChains.test(i80)) {
	    	// console.log('no chains!')
	    	document.getElementById('chains').innerHTML = 'No chain control identified'
	    } else if (FWD.test(i80) || yesChains.test(i80)){
	    	document.getElementById('chains').innerHTML = 'Pack those puppies!'
	    } else if (closure.test(i80)){
	    	document.getElementById('chains').innerHTML = 'Highway is DED'
	    } else {
	    	document.getElementById('chains').innerHTML = "Shit's broke..."
	    }
	});
}

function testchains() {
	$.getJSON('https://allorigins.me/get?url=' + encodeURIComponent('http://www.dot.ca.gov/hq/roadinfo/display.php?page=i80') + '&callback=?', function(data){
		// let i80 = data.contents.split('pre>')[1].split("\n")
		// let i80 = data.contents.split('pre>')[1]
		const people = `
			- Bob (vegetarian)
			- Billa (vegan)
			- Francis
			- Elli (vegetarian)
			- Fred (vegan)
		`;
		let regex = /-\s(\w+?)\s(?=\(vegan\))/g;
		let result = regex.exec(people);

		while(result) {
		  // console.log(result[1]);
		  result = regex.exec(people);
		}
	    // console.log(i80);
	});
}