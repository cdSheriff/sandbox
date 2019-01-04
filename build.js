function hidePopup() {
	document.getElementById("data" + this.id[this.id.length - 1]).style.display = "none"
	this.style.zIndex = 2

}

function showPopup() {
	document.getElementById("data" + this.id[this.id.length - 1]).style.display = "block"
	this.style.zIndex = 4
}

function placeMarker(resort) {
	console.log(resorts[resort])

	var image = document.getElementById("map");
	image.src = resorts[resort].map; 

	for (let i=0; i < resorts[resort].forecasts; i++) {

		var locicon = document.createElement("img")
		locicon.src = "locicon.png"
		locicon.style.width = "6%"
		locicon.style.zIndex = 2
		locicon.style.position = "absolute"
		locicon.id = "marker" + i
		locicon.style.top = (resorts[resort].locs[i][0] - 9) + '%' // why TF is it 9??? shouldnt it be 6?? seems like the alpha background means it trims for width/height shit in here
		locicon.style.left = (resorts[resort].locs[i][1] - 3) + '%'
		locicon.addEventListener("mouseenter", showPopup)
		locicon.addEventListener("mouseleave", hidePopup)

		document.getElementById("mapContain").appendChild(locicon)


		var popup = document.createElement("div")

		
		popup.style.width = "40%"
		popup.style.height = "40%"
		popup.style.background = "white"
		console.log(document.documentElement.clientWidth) 
		popup.style.opacity = 0.8
		popup.style.zIndex = 3
		popup.style.borderRadius = "10px"
		popup.id = "data" + i
		popup.style.display = "none"   		
		popup.style.position = "absolute"
		if (resorts[resort].locs[i][0] <= 50) {
			popup.style.top = resorts[resort].locs[i][0] + '%'
		} else {
			popup.style.bottom = (100 - resorts[resort].locs[i][0]) + '%'
		}
		if (resorts[resort].locs[i][1] <= 50) {
			popup.style.left = resorts[resort].locs[i][1] + '%'
		} else {
			popup.style.right = (100 - resorts[resort].locs[i][1]) + '%'
		}
		document.getElementById("mapContain").appendChild(popup)
		
			// popup.style.position = "relative"
		
		// if (resorts[resort].locs[i][0] <= 50) {
		// 	popup.style.top = resorts[resort].locs[i][0] + '%'

		// } else {
		// 	popup.style.bottom = (100 - resorts[resort].locs[i][0]) + '%'
		// }
		// if (resorts[resort].locs[i][1] <= 50) {
		// 	popup.style.left = resorts[resort].locs[i][1] + '%'

		// } else {
		// 	popup.style.right = (100 - resorts[resort].locs[i][1]) + '%'
		// }

		


		
		// title.innerHTML = `forecast at ${height} feet`
		quickSnow([24,72,168], 'lat=' + resorts[resort].locs[i][2] + '&lon=' + resorts[resort].locs[i][3], resorts[resort].locs[i][4], function(dataToFill) {
			console.log(i)
			var title = document.createElement("h2")
			document.getElementById("data" + i).appendChild(title) 
			title.innerHTML = `Snow forecast for ${dataToFill[2]}: 
			<br> forecast at ${dataToFill[1]} feet
			<br>
			<br> 24 hour forecast: ${dataToFill[0][0]} inches
			<br> 3 day forecast: ${dataToFill[0][1]} inches
			<br> 7 day forecast: ${dataToFill[0][2]} inches`
			title.style.margin = "10%"
		// quickSnow(12, 'lat=' + resorts[resort].locs[i][2] + '&lon=' + resorts[resort].locs[i][3],function(dataToFill) {})
			console.log("data" + i)
			
		})
		// title.innerHTML = `Snow outlook for ${resort}: 
		// 	<br> forecast at blah blah feet
		// 	<br>
		// 	<br> `

	
	}
	           
}