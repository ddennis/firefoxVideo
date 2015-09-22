


$( window ).load(function() {
	init()
});


var videoDivWidth = 800;
var videoDivHeight = 600;

var videosContainerWidth = 600;
var videosContainerHeight = 800;




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
videoElement.id = "videoElement";

videoElement.width = videoDivWidth;
videoElement.height = videoDivHeight;
var playbackVideoContainer = null;

function init() {

	// BTNS
	recordVideoBtn = document.getElementById('start');
	stopVideoBtn = document.getElementById('stop');
	startStillImageBtn = document.getElementById('image');
	resetVideoBtn = document.getElementById('reset');

	// CONTAINERS
	videosContainer = document.getElementById('videos-container');
	videosContainer.style.width = videosContainerWidth + 'px'
	videosContainer.style.height = videosContainerHeight + 'px'

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
		stopVideoBtn.disabled = false;

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
		//var el = document.querySelector("video");
		c.width =  videoDivHeight //el.videoWidth;
		c.height = videoDivWidth // el.videoHeight;

		ctx.translate(c.width, 0);
		ctx.rotate(Math.PI/2);
		ctx.translate(0, c.width);
		ctx.scale(1, -1);

		ctx.drawImage(videoElement,0,0, videoDivWidth ,videoDivHeight);

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

	var opt = {audio: false, video: true};
	mRecordRTC = new MRecordRTC();
	mRecordRTC.mediaType = opt ;

	captureUserMedia( opt , function(stream) {

		videoElement.src = URL.createObjectURL(stream);
		videoElement.play();
		videosContainer.appendChild(videoElement);
		videoStream = stream;

	}, function(err) {
		if(err ){
			alert(JSON.stringify(err));
		}
	});

}


//STOP THE RECORDING
//---------------------------------------------------------------------------------------

function stopRecording(){

	mRecordRTC.stopRecording(function(url, type) {

		if(!playbackVideoContainer ){
			playbackVideoContainer = document.createElement('video');
			playbackVideoContainer.id = "playbackVideoContainer"

			playbackVideoContainer.style.height = 1000;
			recordedVideo.appendChild(playbackVideoContainer);
		}

		playbackVideoContainer.src = url;
		playbackVideoContainer.play();

		// fixing firefox playback issue
		if (!!navigator.mozGetUserMedia) {
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






