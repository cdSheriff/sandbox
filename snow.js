function xmlToJson(xml) {
	
			// Create the return object
			var obj = {};

			if (xml.nodeType == 1) { // element
				// do attributes
				if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
					for (var j = 0; j < xml.attributes.length; j++) {
						var attribute = xml.attributes.item(j);
						obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
					}
				}
			} else if (xml.nodeType == 3) { // text
				obj = xml.nodeValue;
			}

			// do children
			if (xml.hasChildNodes()) {
				for(var i = 0; i < xml.childNodes.length; i++) {
					var item = xml.childNodes.item(i);
					var nodeName = item.nodeName;
					if (typeof(obj[nodeName]) == "undefined") {
						obj[nodeName] = xmlToJson(item);
					} else {
						if (typeof(obj[nodeName].push) == "undefined") {
							var old = obj[nodeName];
							obj[nodeName] = [];
							obj[nodeName].push(old);
						}
						obj[nodeName].push(xmlToJson(item));
					}
				}
			}
			return obj;
		};

		function quickSnow(hours, loc, label, callback) {
			let url = 'https://forecast.weather.gov/MapClick.php?' + loc + '&FcstType=digitalDWML'
			var outputting
			$.get(url, function(response){
				let forecast = xmlToJson(response).dwml.data;
				let snowfall = [];
				let rainDays = [];
				let halfRain = [];

				for (let i=0; i < forecast.parameters.weather['weather-conditions'].length; i++) {
					if (JSON.stringify(forecast.parameters.weather['weather-conditions'][i]).includes('snow')) {
						snowfall.push(poopSnow(forecast,i))
						
					}
					let houring = forecast['time-layout']['start-valid-time'][i]['#text'].split('T')[1].slice(0,2)
					if (houring[0] == 0) {
						houring = parseInt(houring.substring(1))
					} else {
						houring = parseInt(houring)
					}
					
				}

				let rain = '';
				for (let j = 0; j < rainDays.length;j++) {
					rain += ' ' + rainDays[j] + '%'
				}
			outputting = weatherFill(hours,loc,snowfall,rain)
			outputting.push(forecast.location.height['#text'])
			outputting.push(label)
			callback(outputting)
			});
		}

		function poopSnow(forecast,i) {
			let tempChart = {10:[28,34], 15:[20,27], 20:[15,19], 30:[10,14], 40:[0,9], 50:[-20,-1], 100:[-40,-21]};
			let snow
			if (forecast.parameters['hourly-qpf'].value[i]['#text'] == undefined) {
				// console.log('empty block')
				snow = 0
			} else if (forecast.parameters.temperature[2].value[i]['#text'] >= tempChart[Object.keys(tempChart)[0]][1]) {
				snow = forecast.parameters['hourly-qpf'].value[i]['#text'] * Object.keys(tempChart)[0]
				// console.log('over')
			} else if (forecast.parameters.temperature[2].value[i]['#text'] <= tempChart[Object.keys(tempChart).slice(-1)[0]][0]) {
				snow = forecast.parameters['hourly-qpf'].value[i]['#text'] * Object.keys(tempChart)[-1]
			} else {
				for (let j = 0; j < Object.keys(tempChart).length; j++) {
					if (forecast.parameters.temperature[2].value[i]['#text'] >= tempChart[Object.keys(tempChart)[j]][0] && forecast.parameters.temperature[2].value[i]['#text'] <= tempChart[Object.keys(tempChart)[j]][1]) {
						snow = forecast.parameters['hourly-qpf'].value[i]['#text'] * Object.keys(tempChart)[j]
					}
				}
			}
			if (snow == undefined) {
				snow = 0
			}
			return snow;
		}

		function weatherFill(hours,loc,snowfall,rain) {
			let snow = []
			for (let i = 0; i < hours.length; i++) {
				snow.push(snowfall.slice(0, hours[i] + 1).reduce(function(a, b) {return a + b; }, 0).toFixed(1))
			}
		 return [snow]
		}