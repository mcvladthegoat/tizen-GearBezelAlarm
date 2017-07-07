(function () {
	
	var current_dt = tizen.time.getCurrentDateTime();
	// Hours part from the timestamp
	var hours = current_dt.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + current_dt.getMinutes();
	console.log("dssdfdfsdfsdsfdsfdfsdfsdfs", current_dt.getUTCSeconds());
	
	document.getElementById("hour").innerHTML = hours;
	document.getElementById("minute").innerHTML =  minutes.substr(-2);
	
	window.positionMode = "hour";
	window.currentTime = 0;
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageid = "";

		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageid = page ? page.id : "";

			if (pageid === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
	
	var alarms = tizen.alarm.getAll();

	 // Removes the first alarm
	 if (alarms.length > 0) {
		 console.log("dsfsdhfjdsdfsdsdfs");
	   try {
	     tizen.alarm.remove(alarms[0].id);
	     navigator.vibrate(5000);
	   } catch(error) {
	     console.log("Clear queue.");
	   }
	 }	
	 
	
	document.addEventListener("rotarydetent", rotaryEventHandler);
	function rotaryEventHandler(){
        var direction = event.detail.direction;
            if (direction === "CW") {
                // increase time
            	if(window.positionMode == "hour"){
            		window.currentTime+=3600;
            	}
            	else{
            		window.currentTime+=60;
            	}
            	
            	var date = new Date(window.currentTime*1000);
            	// Hours part from the timestamp
            	var hours = date.getHours();
            	// Minutes part from the timestamp
            	var minutes = "0" + date.getMinutes();

            	// Will display time in 10:30:23 format
            	var formattedTime = hours + ':' + minutes.substr(-2);
            	
            	document.getElementById("hour").innerHTML = hours;
            	document.getElementById("minute").innerHTML =  minutes.substr(-2);
//                setting.timeSet = modifyTime(setting.timeSet, setting.selectedType, 1);
//                refreshMainTimeView();
            } else if (direction === "CCW") {
                // decrease time
            	if(window.positionMode == "hour"){
            		window.currentTime-=3600;
            	}
            	else{
            		window.currentTime-=60;
            	}
            	
            	var date = new Date(window.currentTime*1000);
            	// Hours part from the timestamp
            	var hours = date.getHours();
            	// Minutes part from the timestamp
            	var minutes = "0" + date.getMinutes();

            	// Will display time in 10:30:23 format
            	var formattedTime = hours + ':' + minutes.substr(-2);
            	
            	document.getElementById("hour").innerHTML = hours;
            	document.getElementById("minute").innerHTML =  minutes.substr(-2);
            }
		console.warn("WAIT!");
	}
	document.getElementById("hour").addEventListener("click", function(){
		console.info("hour clicked");
		window.positionMode = "hour";
	});
	
	document.getElementById("minute").addEventListener("click", function(){
		console.info("minute clicked");
		window.positionMode = "minute";
	});
	
	document.getElementById("saveTime").addEventListener("click", function(){
		console.info("saveTime clicked");
		navigator.vibrate(250);
		alert("Saved!");
		var alarms = tizen.alarm.getAll();

		 // Removes the first alarm
		 if (alarms.length > 0) {
		   try {
		     tizen.alarm.removeAll();
		     console.log("Successfully removed the first alarm.");
		   } catch(error) {
		     console.log("Failed to remove the first alarm.");
		   }
		 }	 
		 
     	var date = new Date(window.currentTime*1000);
     	var date2 = new Date();
     	
    	// Hours part from the timestamp
    	var hours = date.getHours();
    	// Minutes part from the timestamp
    	var minutes = "0" + date.getMinutes();
    	
    	var day = date2.getDay();
    	var month = date2.getMonth();
    	var year = date2.getYear();
    	
    	var current_dt = tizen.time.getCurrentDateTime();
    	
    	
		 var alarm = new tizen.AlarmAbsolute(new Date(current_dt.getFullYear(), current_dt.getDay()+1, current_dt.getMonth()+1, hours, minutes));
		 var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view");
		 tizen.alarm.add(alarm, tizen.application.getCurrentApplication().appInfo.id, appControl);
		 
		 var alarm = new tizen.AlarmAbsolute(new Date(current_dt.getFullYear(), current_dt.getDay()+1, current_dt.getMonth()+1, hours, minutes, 15));
		 tizen.alarm.add(alarm, tizen.application.getCurrentApplication().appInfo.id, appControl);
		 console.log("Alarm added with id: " + alarm.id);
		 
		 
		 var alarms1 = tizen.alarm.getAll();
//		 console.log('year',year);
//		 console.log('month', month);
//		 console.log('day',day);
		 
		 console.log('alarms',alarms1[0]);
		 
		 console.log(current_dt.getFullYear());
		 console.log(current_dt.getMonth());
		 console.log(current_dt.getDate());
		
	});
	
}());