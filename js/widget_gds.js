// Version Chris1284 15-11-2015 18:15 V1.0
// Edit roman1528 (added Colorized event; onset and expires timestamps)
var widget_gds = {
	_gds: null,
	elements: null,
	init: function () {
		console.log("gds");	
		_gds=this;
		_gds.elements = $('div[data-type="gds"]');
		_gds.elements.each(function(index) {
			var device = $(this).data('device');
			console.log("device: " + device);
			console.log("get: " + $(this).data('get'));	
			console.log("max: " + $(this).data('max'));	
			$(this).data('get', $(this).data('get') || 'state');
			$(this).data('max', $(this).data('max') || 10);
			if ($(this).data('get') == 'alert') {
				var elem = $(this);
				value = elem.data('max');
				elem.data('a_count', 'a_count');
				elem.addReading('a_count');
				for (i = 0; i <= value; i++) {
					$(this).data('a_'+i+'_event', 'a_'+i+'_event');
					elem.addReading('a_'+i+'_event');
					$(this).data('a_'+i+'_description', 'a_'+i+'_description');
					elem.addReading('a_'+i+'_description');
					$(this).data('a_'+i+'_onset_local', 'a_'+i+'_onset_local');
					elem.addReading('a_'+i+'_onset_local');
					$(this).data('a_'+i+'_expires_local', 'a_'+i+'_expires_local');
					elem.addReading('a_'+i+'_expires_local');
					$(this).data('a_'+i+'_eventCode_AREA_COLOR_hex', 'a_'+i+'_eventCode_AREA_COLOR_hex');
					elem.addReading('a_'+i+'_eventCode_AREA_COLOR_hex');
				}
			}
		});
	},
	update: function (dev,par) {
		var deviceElements;
		var text = "";
		var acounter;
		if ( dev == '*' ) {deviceElements= _gds.elements;}
		else {deviceElements= _gds.elements.filter('div[data-device="'+dev+'"]');}

		deviceElements.each(function(index) {
				var get = $(this).data('get');
				if ($(this).data('get') == 'state') { $(this).html( "<div data-type=\"label\" class=\"cell\">No DATA-GET SET</div>");}
				else if ($(this).data('get') == 'alert') {
					acounter = getDeviceValue($(this), 'a_count');
					if ( acounter >= 1 && acounter > $(this).data('max')) {
						for (i = 0; i <= ($(this).data('max') - 1); i++) {
							text += "<div class=\"cell top-space\">";
							text += "<div data-type=\"label\" class=\"cell\" style=\"color:#" + getDeviceValue($(this), 'a_'+i+'_eventCode_AREA_COLOR_hex')+ ";\">Warnung vor " + getDeviceValue($(this), 'a_'+i+'_event') + ":</div>";
							text += "<div data-type=\"label\" class=\"cell\" >" + getDeviceValue($(this), 'a_'+i+'_description')+ "</div>";
							text += "<div data-type=\"label\" class=\"cell\" >Von: " + getDeviceValue($(this), 'a_'+i+'_onset_local')+ " bis: " + getDeviceValue($(this), 'a_'+i+'_expires_local')+ "</div>";
							text += "</div>";
						}
					}
					else if ( acounter >= 1 && acounter <= $(this).data('max') ) {
						for (i = 0; i <= (acounter -1); i++) {
							text += "<div class=\"cell top-space\">";
							text += "<div data-type=\"label\" class=\"cell\" style=\"color:#" + getDeviceValue($(this), 'a_'+i+'_eventCode_AREA_COLOR_hex')+ ";\">Warnung vor " + getDeviceValue($(this), 'a_'+i+'_event') + ":</div>";
							text += "<div data-type=\"label\" class=\"cell\" >" + getDeviceValue($(this), 'a_'+i+'_description')+ "</div>";
							text += "<div data-type=\"label\" class=\"cell\" >Von: " + getDeviceValue($(this), 'a_'+i+'_onset_local')+ " bis: " + getDeviceValue($(this), 'a_'+i+'_expires_local')+ "</div>";
							text += "</div>";
						}
					}
					else {text += "<div data-type=\"label\" class=\"cell top-space\">Es liegen keine Warnungen vor.</div>";}
					$(this).html( text );
				}
			});
		}	 
};