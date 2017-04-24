// if (document.readyState === "complete") { 
var get_file_content = function(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	// xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status == 200) {
			callback(null, xhr.responseText);
		} else {
			callback(status);
		}
	};
	xhr.send();
};


get_file_content('/libs/u_emmet_attr/ue-dict.json', function(err, data) {
	if (err == null) {
		var nodeList = document.getElementsByTagName('*');
		
		var prefix = 'u-';

		var emmets = JSON.parse(data);

		for (var i = 0, n = nodeList.length; i < n; i++) {
			for (var j = 0, m = nodeList[i].attributes.length; j < m; j++) {
				var prop = emmets[nodeList[i].attributes[j].name.replace(prefix, '')];
				var val = nodeList[i].attributes[j].value;
				if(prop){
					// console.log(prop);
					if(typeof(prop) == "string" && val.trim() != ""){
						nodeList[i].style[prop] = val;
					} else if (typeof(prop) == "object") {
						nodeList[i].style[prop[0]] = prop[1];
					}
				}

			}
		}
	} else {
		console.log('Something went wrong: ' + err);
	}
});
// }
