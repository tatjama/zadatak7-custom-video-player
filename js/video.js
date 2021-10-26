const videoPlayer = document.querySelector(".video");
const container = document.querySelector(".container");
const playPauseBtn = document.querySelector(".play-pause");
const viewScreenBtn = document.querySelector(".screen");
const speeds = document.querySelectorAll("li");
const videoSpeedList = document.querySelector(".speed-list");
const videoSpeedBtn = document.querySelector(".speed-btn");
const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.querySelector(".volume-slider");

class Player{
    constructor(video,  volume, time, speed){
        this.video = video;
        this.volume = volume;
        this.time = time;
        this.speed = speed;
    }  
    
    playPause = () => this.video.paused? this.video.play(): this.video.pause(); 

    setVolume = (value, volume) => {
       volumeSlider.value = value;
        this.video.volume = volume;
        console.log(this.speed)
    }

    toggleVolume =  () => (volumeSlider.value !== "0")? this.setVolume("0", 0): this.setVolume("100", 1);
    
    changeVolume = () => this.video.volume = volumeSlider.value / 100;    

    selectSpeed(e){
        this.speed = e.target.firstChild.data*1;        
        this.video.playbackRate = this.speed;        
        speeds.forEach(el=> el.style.backgroundImage = "none");
        e.target.style.backgroundImage = "url(./images/icon-check.svg)";
        videoSpeedBtn.innerHTML = " x " + this.speed;
    }
}
class UI{
    constructor(player){
        this.player = player;
    }

    displayPlayer(){
        document.querySelector(".time-control").innerHTML = `        
            <span class="time-start">${this.calculateTime(this.player.time)}</span>
            <input class="time-range" type="range" min="0" max="100" value="0" name="time">
            <span class="time-end">${this.calculateTime(this.player.video.duration)}</span>        
        `        
    }

    calculateTime = (time) => {
        return   Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }

    updateSliderPosition = (element, value ) => {
        let trackValue = (value)/(this.player.video.duration)*100;
        element.style.background = 'linear-gradient(to right, red 0%, red ' 
        + trackValue + '%, grey ' + trackValue + '%, grey 100%)'
    };

   }

class Utility{
    static displayFullScreen = () => container.classList.add("full");
    static escapeFullScreen = (e) => (e.key === "Escape") && container.classList.remove("full");
    static toggleSpeedList = () =>  videoSpeedList.style.display =  (videoSpeedList.style.display !== "block") ? "block": "none";
    static closeSpeedList = (e) => videoSpeedList.style.display = (e.target !==videoSpeedBtn )&& "none";
}

videoPlayer.addEventListener("loadedmetadata",() => {
    const myPlayer = new Player(videoPlayer,  0.5, 0, 1);
    const ui = new UI(myPlayer);
    ui.displayPlayer();    

    const timeStart = document.querySelector(".time-start");
    const timeInputRange = document.querySelector(".time-range");

    myPlayer.video.addEventListener("click",() => {
        myPlayer.playPause()
    } );    
    
    playPauseBtn.addEventListener("click",() => myPlayer.playPause());
    
    myPlayer.video.ontimeupdate = (e) => {
        timeStart.innerHTML =  ui.calculateTime(e.target.currentTime);
        ui.updateSliderPosition(timeInputRange, e.target.currentTime);
    }

    timeInputRange.onchange = () => myPlayer.video.currentTime = timeInputRange.value * myPlayer.video.duration/ 100;
       
    volumeBtn.addEventListener("click", myPlayer.toggleVolume);

    volumeSlider.addEventListener("input", myPlayer.changeVolume);

    speeds.forEach(el => el.addEventListener("click",(e) => myPlayer.selectSpeed(e)));

})


    viewScreenBtn.addEventListener("click", Utility.displayFullScreen);
    document.addEventListener("keydown", Utility.escapeFullScreen);  
    videoSpeedBtn.addEventListener("click", Utility.toggleSpeedList);    
    document.addEventListener("click", Utility.closeSpeedList);
    
