(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/src/main.js":[function(require,module,exports){



$( window ).load(function() {
	init()
});



var mRecordRTC = null;

var videosContainer = null;
var playbackVideoContainer = null;
var recordVideoBtn = null;
var stopBtn = null;
var stopVideoBtn = null;
var recordedVideo = null;
var recording = false;

var videoStream = null;

var videoElement = document.createElement('video');
var playbackVideoContainer = null

function init() {

	// BTNS
	recordVideoBtn = document.getElementById('start');
	stopVideoBtn = document.getElementById('stop');
	startStillImageBtn = document.getElementById('image');
	resetVideoBtn = document.getElementById('reset');

	// CONTAINERS
	videosContainer = document.getElementById('videos-container');
	recordedVideo = document.getElementById('recordedVideo');

	setupBtns();

};


function setupBtns() {

	stopVideoBtn.disabled = true

	recordVideoBtn.onclick = function (e) {
		//startCapture(false)

		resetPreviousVideo();

		recording = true
		recordVideoBtn.disabled = true;
		stopVideoBtn.disabled = false

		mRecordRTC.addStream(videoStream);
		 mRecordRTC.startRecording();

	};

	stopVideoBtn.onclick = function (e) {
		recording = false;
		stopRecording();

		recordVideoBtn.disabled = false;
		stopVideoBtn.disabled = true;

	};


	resetVideoBtn.onclick = function (e) {
		resetPreviousVideo();

	};


	startStillImageBtn.onclick = function (e) {

		var c = document.getElementById("myCanvas");
		var ctx=c.getContext("2d");
		var el = document.querySelector("video");
		c.width = el.videoWidth
		c.height = el.videoHeight
		console.log (" main.js > el.videoWidth " , el.videoWidth)

		ctx.drawImage(el,0,0);
		//startRecording(true)
	};


	startCapture()

}



//---------------------------------------------------------------------------------------
function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
	console.log (" main.js > CAPTURE " );
	navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}


// START THE RECORDING
//---------------------------------------------------------------------------------------
function startCapture(){

	var useAudio = false;

	var opt = {audio: useAudio, video: true};

	mRecordRTC = new MRecordRTC();
	mRecordRTC.mediaType = opt ;


	captureUserMedia( opt ,

	function(stream) {

		videoElement.src = URL.createObjectURL(stream);
		videoElement.play();

		var mediaElement = getMediaElement(videoElement, {
			buttons: [],
			showOnMouseEnter: false,
			enableTooltip: false
		});

		videosContainer.appendChild(mediaElement);

		videoStream = stream;
		if(recording ){
			console.log (" main.js > YES YES " )
			/*mRecordRTC.addStream(stream);
			mRecordRTC.startRecording();*/
		}


	}, function(err) {
		if(err ){
			alert(JSON.stringify(err));
		}


	});

}


//STOP THE RECORDING
//---------------------------------------------------------------------------------------


function stopRecording(){

	console.log (" main.js > stopRecording " )
	
	mRecordRTC.stopRecording(function(url, type) {
		/*document.querySelector(type).src = url;
		document.querySelector(type).play();*/

		if(!playbackVideoContainer ){
			playbackVideoContainer = document.createElement('video');
			recordedVideo.appendChild(playbackVideoContainer);
		}



		playbackVideoContainer.src = url
		playbackVideoContainer.play()

		// fixing firefox playback issue
		if (!!navigator.mozGetUserMedia) {
			//document.querySelector(type).onended = function() {
			//	document.querySelector(type).src = URL.createObjectURL(mRecordRTC.getBlob()[type]);
			//	document.querySelector(type).play();

			playbackVideoContainer.onended = function() {
				playbackVideoContainer.src = URL.createObjectURL(mRecordRTC.getBlob()[type]);
				playbackVideoContainer.play()
			};
		}


		//------------------------------------------
		console.log (" main.js > VIDEO URL " , url)
		//------------------------------------------
		var pathToVideoEl =  document.getElementById("pathToVideo")
		pathToVideoEl.innerHTML += "<a href='" + url + "'>Open video in browser</a>" ;
		recordedVideo.style.display = "block";
		
		mRecordRTC.writeToDisk();
		//save.disabled = false;
	});
};



// IF PREVIOUS VIDEO EXIST CLEAR VALUES
//---------------------------------------------------------------------------------------

function resetPreviousVideo() {

	// hides the current video URL and reset btn
	var pathToVideoEl =  document.getElementById("pathToVideo")
	pathToVideoEl.innerHTML = "";
	recordedVideo.style.display = "none";

	if(playbackVideoContainer ){
		playbackVideoContainer.pause();
		playbackVideoContainer.src = ""
	}

};







},{}]},{},["./app/src/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLi9hcHAvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxuXHJcblxyXG4kKCB3aW5kb3cgKS5sb2FkKGZ1bmN0aW9uKCkge1xyXG5cdGluaXQoKVxyXG59KTtcclxuXHJcblxyXG5cclxudmFyIG1SZWNvcmRSVEMgPSBudWxsO1xyXG5cclxudmFyIHZpZGVvc0NvbnRhaW5lciA9IG51bGw7XHJcbnZhciBwbGF5YmFja1ZpZGVvQ29udGFpbmVyID0gbnVsbDtcclxudmFyIHJlY29yZFZpZGVvQnRuID0gbnVsbDtcclxudmFyIHN0b3BCdG4gPSBudWxsO1xyXG52YXIgc3RvcFZpZGVvQnRuID0gbnVsbDtcclxudmFyIHJlY29yZGVkVmlkZW8gPSBudWxsO1xyXG52YXIgcmVjb3JkaW5nID0gZmFsc2U7XHJcblxyXG52YXIgdmlkZW9TdHJlYW0gPSBudWxsO1xyXG5cclxudmFyIHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbnZhciBwbGF5YmFja1ZpZGVvQ29udGFpbmVyID0gbnVsbFxyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuXHJcblx0Ly8gQlROU1xyXG5cdHJlY29yZFZpZGVvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcblx0c3RvcFZpZGVvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3AnKTtcclxuXHRzdGFydFN0aWxsSW1hZ2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKTtcclxuXHRyZXNldFZpZGVvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0Jyk7XHJcblxyXG5cdC8vIENPTlRBSU5FUlNcclxuXHR2aWRlb3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW9zLWNvbnRhaW5lcicpO1xyXG5cdHJlY29yZGVkVmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjb3JkZWRWaWRlbycpO1xyXG5cclxuXHRzZXR1cEJ0bnMoKTtcclxuXHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0dXBCdG5zKCkge1xyXG5cclxuXHRzdG9wVmlkZW9CdG4uZGlzYWJsZWQgPSB0cnVlXHJcblxyXG5cdHJlY29yZFZpZGVvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Ly9zdGFydENhcHR1cmUoZmFsc2UpXHJcblxyXG5cdFx0cmVzZXRQcmV2aW91c1ZpZGVvKCk7XHJcblxyXG5cdFx0cmVjb3JkaW5nID0gdHJ1ZVxyXG5cdFx0cmVjb3JkVmlkZW9CdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0c3RvcFZpZGVvQnRuLmRpc2FibGVkID0gZmFsc2VcclxuXHJcblx0XHRtUmVjb3JkUlRDLmFkZFN0cmVhbSh2aWRlb1N0cmVhbSk7XHJcblx0XHQgbVJlY29yZFJUQy5zdGFydFJlY29yZGluZygpO1xyXG5cclxuXHR9O1xyXG5cclxuXHRzdG9wVmlkZW9CdG4ub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRyZWNvcmRpbmcgPSBmYWxzZTtcclxuXHRcdHN0b3BSZWNvcmRpbmcoKTtcclxuXHJcblx0XHRyZWNvcmRWaWRlb0J0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0c3RvcFZpZGVvQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcblx0fTtcclxuXHJcblxyXG5cdHJlc2V0VmlkZW9CdG4ub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRyZXNldFByZXZpb3VzVmlkZW8oKTtcclxuXHJcblx0fTtcclxuXHJcblxyXG5cdHN0YXJ0U3RpbGxJbWFnZUJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcblx0XHR2YXIgYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDYW52YXNcIik7XHJcblx0XHR2YXIgY3R4PWMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cdFx0dmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xyXG5cdFx0Yy53aWR0aCA9IGVsLnZpZGVvV2lkdGhcclxuXHRcdGMuaGVpZ2h0ID0gZWwudmlkZW9IZWlnaHRcclxuXHRcdGNvbnNvbGUubG9nIChcIiBtYWluLmpzID4gZWwudmlkZW9XaWR0aCBcIiAsIGVsLnZpZGVvV2lkdGgpXHJcblxyXG5cdFx0Y3R4LmRyYXdJbWFnZShlbCwwLDApO1xyXG5cdFx0Ly9zdGFydFJlY29yZGluZyh0cnVlKVxyXG5cdH07XHJcblxyXG5cclxuXHRzdGFydENhcHR1cmUoKVxyXG5cclxufVxyXG5cclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBjYXB0dXJlVXNlck1lZGlhKG1lZGlhQ29uc3RyYWludHMsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xyXG5cdGNvbnNvbGUubG9nIChcIiBtYWluLmpzID4gQ0FQVFVSRSBcIiApO1xyXG5cdG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKG1lZGlhQ29uc3RyYWludHMpLnRoZW4oc3VjY2Vzc0NhbGxiYWNrKS5jYXRjaChlcnJvckNhbGxiYWNrKTtcclxufVxyXG5cclxuXHJcbi8vIFNUQVJUIFRIRSBSRUNPUkRJTkdcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gc3RhcnRDYXB0dXJlKCl7XHJcblxyXG5cdHZhciB1c2VBdWRpbyA9IGZhbHNlO1xyXG5cclxuXHR2YXIgb3B0ID0ge2F1ZGlvOiB1c2VBdWRpbywgdmlkZW86IHRydWV9O1xyXG5cclxuXHRtUmVjb3JkUlRDID0gbmV3IE1SZWNvcmRSVEMoKTtcclxuXHRtUmVjb3JkUlRDLm1lZGlhVHlwZSA9IG9wdCA7XHJcblxyXG5cclxuXHRjYXB0dXJlVXNlck1lZGlhKCBvcHQgLFxyXG5cclxuXHRmdW5jdGlvbihzdHJlYW0pIHtcclxuXHJcblx0XHR2aWRlb0VsZW1lbnQuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG5cdFx0dmlkZW9FbGVtZW50LnBsYXkoKTtcclxuXHJcblx0XHR2YXIgbWVkaWFFbGVtZW50ID0gZ2V0TWVkaWFFbGVtZW50KHZpZGVvRWxlbWVudCwge1xyXG5cdFx0XHRidXR0b25zOiBbXSxcclxuXHRcdFx0c2hvd09uTW91c2VFbnRlcjogZmFsc2UsXHJcblx0XHRcdGVuYWJsZVRvb2x0aXA6IGZhbHNlXHJcblx0XHR9KTtcclxuXHJcblx0XHR2aWRlb3NDb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuXHJcblx0XHR2aWRlb1N0cmVhbSA9IHN0cmVhbTtcclxuXHRcdGlmKHJlY29yZGluZyApe1xyXG5cdFx0XHRjb25zb2xlLmxvZyAoXCIgbWFpbi5qcyA+IFlFUyBZRVMgXCIgKVxyXG5cdFx0XHQvKm1SZWNvcmRSVEMuYWRkU3RyZWFtKHN0cmVhbSk7XHJcblx0XHRcdG1SZWNvcmRSVEMuc3RhcnRSZWNvcmRpbmcoKTsqL1xyXG5cdFx0fVxyXG5cclxuXHJcblx0fSwgZnVuY3Rpb24oZXJyKSB7XHJcblx0XHRpZihlcnIgKXtcclxuXHRcdFx0YWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHR9KTtcclxuXHJcbn1cclxuXHJcblxyXG4vL1NUT1AgVEhFIFJFQ09SRElOR1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbmZ1bmN0aW9uIHN0b3BSZWNvcmRpbmcoKXtcclxuXHJcblx0Y29uc29sZS5sb2cgKFwiIG1haW4uanMgPiBzdG9wUmVjb3JkaW5nIFwiIClcclxuXHRcclxuXHRtUmVjb3JkUlRDLnN0b3BSZWNvcmRpbmcoZnVuY3Rpb24odXJsLCB0eXBlKSB7XHJcblx0XHQvKmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodHlwZSkuc3JjID0gdXJsO1xyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0eXBlKS5wbGF5KCk7Ki9cclxuXHJcblx0XHRpZighcGxheWJhY2tWaWRlb0NvbnRhaW5lciApe1xyXG5cdFx0XHRwbGF5YmFja1ZpZGVvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuXHRcdFx0cmVjb3JkZWRWaWRlby5hcHBlbmRDaGlsZChwbGF5YmFja1ZpZGVvQ29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblxyXG5cclxuXHRcdHBsYXliYWNrVmlkZW9Db250YWluZXIuc3JjID0gdXJsXHJcblx0XHRwbGF5YmFja1ZpZGVvQ29udGFpbmVyLnBsYXkoKVxyXG5cclxuXHRcdC8vIGZpeGluZyBmaXJlZm94IHBsYXliYWNrIGlzc3VlXHJcblx0XHRpZiAoISFuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7XHJcblx0XHRcdC8vZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0eXBlKS5vbmVuZGVkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHR5cGUpLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwobVJlY29yZFJUQy5nZXRCbG9iKClbdHlwZV0pO1xyXG5cdFx0XHQvL1x0ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0eXBlKS5wbGF5KCk7XHJcblxyXG5cdFx0XHRwbGF5YmFja1ZpZGVvQ29udGFpbmVyLm9uZW5kZWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRwbGF5YmFja1ZpZGVvQ29udGFpbmVyLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwobVJlY29yZFJUQy5nZXRCbG9iKClbdHlwZV0pO1xyXG5cdFx0XHRcdHBsYXliYWNrVmlkZW9Db250YWluZXIucGxheSgpXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRjb25zb2xlLmxvZyAoXCIgbWFpbi5qcyA+IFZJREVPIFVSTCBcIiAsIHVybClcclxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHR2YXIgcGF0aFRvVmlkZW9FbCA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhdGhUb1ZpZGVvXCIpXHJcblx0XHRwYXRoVG9WaWRlb0VsLmlubmVySFRNTCArPSBcIjxhIGhyZWY9J1wiICsgdXJsICsgXCInPk9wZW4gdmlkZW8gaW4gYnJvd3NlcjwvYT5cIiA7XHJcblx0XHRyZWNvcmRlZFZpZGVvLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblx0XHRcclxuXHRcdG1SZWNvcmRSVEMud3JpdGVUb0Rpc2soKTtcclxuXHRcdC8vc2F2ZS5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuXHJcblxyXG4vLyBJRiBQUkVWSU9VUyBWSURFTyBFWElTVCBDTEVBUiBWQUxVRVNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0UHJldmlvdXNWaWRlbygpIHtcclxuXHJcblx0Ly8gaGlkZXMgdGhlIGN1cnJlbnQgdmlkZW8gVVJMIGFuZCByZXNldCBidG5cclxuXHR2YXIgcGF0aFRvVmlkZW9FbCA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhdGhUb1ZpZGVvXCIpXHJcblx0cGF0aFRvVmlkZW9FbC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdHJlY29yZGVkVmlkZW8uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cclxuXHRpZihwbGF5YmFja1ZpZGVvQ29udGFpbmVyICl7XHJcblx0XHRwbGF5YmFja1ZpZGVvQ29udGFpbmVyLnBhdXNlKCk7XHJcblx0XHRwbGF5YmFja1ZpZGVvQ29udGFpbmVyLnNyYyA9IFwiXCJcclxuXHR9XHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=
