


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






