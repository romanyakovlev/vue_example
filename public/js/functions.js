function randWD(n) {
	return Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(n, 10)) );
}

//функция валидации логина 
function loginValidation (value) {
	if ( !value) {
		return ["unknown"];
	}

	var check = value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
	if ( check && (check[0] === value) ) {
		if ( value.length > 255 ) {
			return ["unknown"]; 
		} else {
			return ["email", value];
		}
	} else {
		value = value.replace(/[^0-9,]/g, "");

		switch(value.length) {
			case 0:
				return ["unknown"];
			break
			case 11:
				if ( value.substr(0,2) === "79" ) {
					return ["phone", "+" +  value];
				} else if ( value.substr(0,2) === "89" ) {
					return ["phone", "+7" + value.substr(1,10)];
				} else {
					return ["unknown"];
				}
			break
			case 10:
				if ( value.substr(0,1) == "9" ) {
					return ["phone", "+7" + value];
				} else {
					return ["unknown"];
				}
			break
			default:
				return ["unknown"];	
		}
	}
};


//валидация пароля
function passwordValidation(password) {
	if(password) {
		if ( password.length > 20 ) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

//отправка JSON в POST на сервер
function sendJSON(url, obj, callback) {
	$.ajax({
		url: url,
		method: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		data: JSON.stringify(obj),
		success: function(data) {
			callback(null, data);
		},
		error: function(jqXHR, textStatus) {
			callback(textStatus);
		}
	});
}

//отправка GET-запроса 
function sendGET(url, callback) {
	$.ajax({
		url: url,
		method: "GET",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		success: function(data) {
			callback(null, data);
		},
		error: function(jqXHR, textStatus) {
			callback(textStatus);
		}
	});
}


//функция возвращает декартовы координаты iй точки на элипсе 
function getXY(n, a, b, i) {
	var R = a; 

	var x_i = R * Math.cos((2* Math.PI * i) / n);

	var y_i = R * Math.sin((2* Math.PI * i) / n);

	var bb = b*b;
	var xx = x_i * x_i;
	var aa = a * a;

	if (y_i > 0) {
		y_i = Math.sqrt( bb * (1-(xx/aa)) );
	} 		

	if(y_i < 0) {
		y_i = -Math.sqrt( bb * (1-(xx/aa)) );
	}

	

	x_i = Math.floor(x_i);
	y_i = Math.floor(y_i);
	
	return [x_i, y_i];

}

//функция возвращает массив декартовых координат точек при заданном числе точек и дельте сплющивания
function getPoins(n, a, b) {
	var results = new Array();
	for (var i = 1; i <= n; i++) {
		results.push(getXY(n,a,b,i));
	}
	return results;
}

function randomInteger(min, max) {
	var rand = min + Math.random() * (max - min)
	rand = Math.round(rand);
	return rand;
};

