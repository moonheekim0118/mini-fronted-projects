
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop1= document.getElementById('stop');
const progress = document.getElementById('prograss');
const timestamp = document.getElementById('timestamp');

// play and pause video

function toggleVideoStatus(){ // 동영상 전체나, 플레이 버튼을 누르면 동작함 
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}


// update play/pause Icon
function updatePlayIcon(){ // paused 되면 play버튼으로, play되면 paused 버튼으로 바꾸어준다.
    if(video.paused){
        play.innerHTML=`<i class="fa fa-play fa-2x"></i>`
    }else{
        play.innerHTML=`<i class="fa fa-pause fa-2x"></i>`
    }
}

// update Progress & timestamp'
function updateProgress(){ // 현재 progress를 동작하게 해주고, time stamp를 업데이트 해준다 
    progress.value=(video.currentTime / video.duration) * 100;
    const currenttime=video.currentTime;
    let mins= Math.floor(currenttime/60);
    if(mins < 10){ 
        mins = '0' + String(mins);
    }
    let sec = Math.floor(currenttime %60);
    if(sec < 10){ 
        sec = '0' + String(sec);
    }
    timestamp.innerHTML= `${mins} : ${sec}`
}

// set video time to prgoress
function setVideoProgress(){ // 옮겨진 prgoress로 current time을 옮겨준다. 
    video.currentTime =(+progress.value)*video.duration / 100;
}

//stop video 
function stopVideo(){
    video.currentTime=0;
    video.pause();
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop1.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress );