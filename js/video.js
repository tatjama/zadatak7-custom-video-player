const videoPlayer = document.querySelector(".video");
const container = document.querySelector(".container");
const playPauseBtn = document.querySelector(".play-pause");
const viewScreenBtn = document.querySelector(".screen");
const speeds = document.querySelectorAll("li");
const videoSpeedList = document.querySelector(".speed-list");
const videoSpeedBtn = document.querySelector(".speed-btn");
const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.querySelector(".volume-slider");
const messageContainer = document.querySelector(".message-container");
const playScreenBtn = document.querySelector(".play-screen-container");

class MyVideo{
    constructor(video,  volume, time, speed){
        this.video = video;
        this.volume = volume;
        this.time = time;
        this.speed = speed;
    }  
    
    playPause = () => {
        if(this.video.paused){
            this.video.play();
            playPauseBtn.classList.add("active");
        }else{
            this.video.pause();
            playPauseBtn.classList.remove("active");
        } 
    }  
}
class MyPlayer{
    constructor(myVideo){
        this.myVideo = myVideo;
    }

    displayTimeControl(){
        document.querySelector(".time-control").innerHTML = `        
            <span class="time-start">${this.calculateTime(this.myVideo.time)}</span>
            <input class="time-range" type="range" min="0" max="100" value="0" name="time">
            <span class="time-end">${this.calculateTime(this.myVideo.video.duration)}</span>        
        `        
    }

    calculateTime = (time) => {
        return   Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }

    updateSliderDisplay = (element, value)=>{
        element.style.background = 'linear-gradient(to right, red 0%, red ' 
        + value + '%, grey ' + value + '%, grey 100%)'
    }

    updateSliderPosition = (element, value ) => {
        let trackValue = (value)/(this.myVideo.video.duration)*100;
        this.updateSliderDisplay(element, trackValue);
    };

    selectSpeed(e){
        this.myVideo.speed = e.target.firstChild.data*1;        
        this.myVideo.video.playbackRate = this.myVideo.speed;        
        speeds.forEach(el=> el.style.backgroundImage = "none");
        e.target.style.backgroundImage = "url(./images/icon-check.svg)";
        videoSpeedBtn.innerHTML = " x " + this.myVideo.speed;
    }

    setVolume = (value, volume) => {
        volumeBtn.classList.contains("active")? volumeBtn.classList.remove("active"):volumeBtn.classList.add("active");
        volumeSlider.value = value;
        this.updateSliderDisplay(volumeSlider, value);
        this.myVideo.video.volume = volume;

     }
    
     toggleVolume =  () => (volumeSlider.value != "0")? this.setVolume("0", 0): this.setVolume("100", 1);
    
     changeVolume = () => {
        this.myVideo.video.volume = volumeSlider.value / 100;
        volumeSlider.value !== 0 && volumeBtn.classList.contains("active")&& volumeBtn.classList.remove("active");
        volumeSlider.value == 0 && !volumeBtn.classList.contains("active")&& volumeBtn.classList.add("active");
        this.updateSliderDisplay(volumeSlider, volumeSlider.value);
    }
}

class Utility{
    static toggleFullScreen = () => {
        if(container.classList.contains("full")){
            container.classList.remove("full");
            viewScreenBtn.classList.remove("active");
        }else{
            container.classList.add("full");
            viewScreenBtn.classList.add("active");
            messageContainer.style.display = "block";
            setTimeout(function(){messageContainer.style.display = "none"}, 3000);
        }        
    }

    static escapeFullScreen = (e) => {
        if(e.key === "Escape"){
        container.classList.remove("full");
        viewScreenBtn.classList.remove("active");
    }}

    static toggleSpeedList = () =>  videoSpeedList.style.display =  (videoSpeedList.style.display !== "block") ? "block": "none";
    
    static closeSpeedList = (e) => videoSpeedList.style.display = (e.target !==videoSpeedBtn )&& "none";
}

videoPlayer.addEventListener("loadedmetadata",() => {
    const myVideo = new MyVideo(videoPlayer,  0.5, 0, 1);
    const myPlayer = new MyPlayer(myVideo);
    myPlayer.displayTimeControl();    

    const timeStart = document.querySelector(".time-start");
    const timeInputRange = document.querySelector(".time-range");
    playScreenBtn.style.display = "block";
    setTimeout(function() {playScreenBtn.style.display = "none";}, 1000);
    myVideo.video.addEventListener("click",() =>  myVideo.playPause());  
    playScreenBtn.addEventListener("click", () =>myVideo.playPause());  
    playPauseBtn.addEventListener("click",() => myVideo.playPause());
    volumeBtn.addEventListener("click", myPlayer.toggleVolume);
    volumeSlider.addEventListener("input", myPlayer.changeVolume);
    speeds.forEach(el => el.addEventListener("click",(e) => myPlayer.selectSpeed(e)));

    myVideo.video.ontimeupdate = (e) => {
        timeStart.innerHTML =  myPlayer.calculateTime(e.target.currentTime);
        myPlayer.updateSliderPosition(timeInputRange, e.target.currentTime);
    }

    myVideo.video.onended = () => {
        myPlayer.updateSliderPosition(timeInputRange, 0);
        timeStart.innerHTML = myPlayer.calculateTime(0);
        playPauseBtn.classList.contains("active") && playPauseBtn.classList.remove("active");
        myVideo.video.volume = 0.3;  
        volumeBtn.classList.contains("active")&&volumeBtn.classList.remove("active");
        myVideo.video.playbackRate = 1;
        videoSpeedBtn.innerHTML = "x 1";           
        speeds.forEach(el=> el.style.backgroundImage = "none");
        document.querySelector("li:nth-child(4)").style.backgroundImage = "url(./images/icon-check.svg)";
        playScreenBtn.style.display = "block";
        setTimeout(function() {playScreenBtn.style.display = "none";}, 1000);
    }
    
    timeInputRange.onchange = () => myVideo.video.currentTime = timeInputRange.value * myVideo.video.duration/ 100;
})
    
    viewScreenBtn.addEventListener("click", Utility.toggleFullScreen);
    document.addEventListener("keydown", Utility.escapeFullScreen);  
    videoSpeedBtn.addEventListener("click", Utility.toggleSpeedList);    
    document.addEventListener("click", Utility.closeSpeedList);
    
