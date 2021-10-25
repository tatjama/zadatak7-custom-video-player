const videoPlayer = document.querySelector(".video");
const playPauseBtn = document.querySelector(".play-pause");
const container = document.querySelector(".container");
const viewScreenBtn = document.querySelector(".screen");
const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.querySelector(".volume-slider");
const videoSpeedBtn = document.querySelector(".speed-btn");
const videoSpeedList = document.querySelector(".speed-list");
const speeds = document.querySelectorAll("li");
const timeInputRange = document.querySelector(".time-range");
const timeEnd = document.querySelector(".time-end");
const timeStart = document.querySelector(".time-start");
let videoDuration = 0;

const playPause = () => videoPlayer.paused? videoPlayer.play(): videoPlayer.pause();

/**Full Screen Control */
const displayFullScreen = () => container.classList.add("full");
const escapeFullScreen = (e) => (e.key === "Escape") && container.classList.remove("full");

/** Volume Control */
const setVolume = (value, volume) => {
    volumeSlider.value = value;
    videoPlayer.volume = volume;
}
const toggleVolume =  () => (volumeSlider.value !== "0")? setVolume("0", 0): setVolume("100", 1);
const changeVolume = () => videoPlayer.volume = volumeSlider.value / 100;

/** Speed Control */
const toggleSpeedList = () =>  videoSpeedList.style.display =  (videoSpeedList.style.display !== "block") ? "block": "none";
const closeSpeedList = (e) =>    videoSpeedList.style.display = (e.target !==videoSpeedBtn )&& "none";
    
function selectSpeed(){
    speeds.forEach(el=> el.style.backgroundImage = "none");
    videoPlayer.playbackRate = this.innerText*1;
    this.style.backgroundImage = "url(./images/icon-check.svg)";
    videoSpeedBtn.innerHTML = this.innerText + " x Speed";
}

/**Time Control */
const calculateTime = (time) => {
    return   Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

const updateSliderPosition = (element, value ) => {
    let trackValue = (value)/(videoDuration)*100;
    element.style.background = 'linear-gradient(to right, red 0%, red ' 
    + trackValue + '%, grey ' + trackValue + '%, grey 100%)'
};
  
timeInputRange.oninput = () => updateSliderPosition(timeInputRange, this.value)
timeInputRange.onchange = () => videoPlayer.currentTime = timeInputRange.value * videoDuration/ 100;

videoPlayer.onloadedmetadata = function(e){
    videoDuration = e.target.duration;
    timeEnd.innerHTML =  calculateTime(videoDuration);
}

videoPlayer.ontimeupdate = function(e){
    timeStart.innerHTML =  calculateTime(e.target.currentTime);
    updateSliderPosition(timeInputRange, e.target.currentTime);
}

/**Event Listeners */
videoPlayer.addEventListener("click", playPause);
playPauseBtn.addEventListener("click", playPause);
viewScreenBtn.addEventListener("click", displayFullScreen);
document.addEventListener("keydown", escapeFullScreen);
volumeBtn.addEventListener("click", toggleVolume);
volumeSlider.addEventListener("input", changeVolume);
videoSpeedBtn.addEventListener("click", toggleSpeedList);
document.addEventListener("click", closeSpeedList);
speeds.forEach(el => el.addEventListener("click", selectSpeed));