/* control buttons */ 
const playBtn = document.getElementById('play'); // toggle 
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffle = document.getElementById('shuffle');
const music_container = document.querySelector('.music__info');
const cover_img = document.getElementById('cover');  

/* music info */ 
let musicTitle = document.getElementById('title').innerText;
const progressContainer = document.getElementById('progress__container');
const progress = document.getElementById('progress');

const music1 = document.getElementById('alessia');

const musicList = ['alessia','lorde','sia'];
let shuffleList= [];
// 음악 play 시 
const playMusic=function(){
    cover_img.classList.add('play');
    music_container.classList.add('play');
    music1.play();
    playBtn.innerHTML=`<i class="fas fa-pause"></i>`; // pause로 바꾸어준다. 
}

// 음악 멈출 시 
const pauseMusic = function(){
    cover_img.classList.remove('play');
    music_container.classList.remove('play');
    music1.pause();
    playBtn.innerHTML=`<i class="fas fa-play"></i>`; // play로 바꾸어준다.
}

// 음악 바꾸기 
const changeMusic = function(){
    document.getElementById('title').innerText=musicTitle;
    music1.src=`contents/${musicTitle}.mp3`;
    cover_img.src=`contents/${musicTitle}.jpg`;
    playMusic();
}

// progress bar 업데이트 --> 현재 time 과 duration 비율로 나누어서 계산  
function updateProgress(e){
    const {duration, currentTime}  = e.srcElement;
    const progressPercent= (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Progress bar 움직임 
const SetProgress = function(e){
    const width = this.clientWidth; // prgoress bar의 전체 width 
    const clickX = e.offsetX; // progress bar의 현재 width 
    const nowTime=(clickX/width)*music1.duration; 
    music1.currentTime=nowTime;
}

// shuffle 버튼 
const shuffleSongs = function(){
    shuffle.classList.toggle('clicked');
    if(shuffle.classList.contains('clicked')){
        musicList.forEach(song=>{ // 리스트 섞어서 shuffle list 만들기 
            let nowIndex= Math.floor(Math.random()*Math.floor(3)); 
            while(shuffleList[nowIndex]!==undefined){ // 노래 겹치지 않도록  아직 채워지지 않은 배열에만 song 넣기 
                nowIndex= Math.floor(Math.random()*Math.floor(3));
            }
            shuffleList[nowIndex]=song;

        })
        console.log(shuffleList);
    }
    else{ // 셔플 끝나면 비우기 
        shuffleList=[];
    }
    
}

const nextMusic=function(){ // 다음 음악으로 넘기기 
    if(shuffle.classList.contains('clicked')){ // shuffle 상태 
        const nowPlaying= shuffleList.indexOf(musicTitle);
        console.log(nowPlaying);
        if(nowPlaying === shuffleList.length-1) {
            musicTitle= shuffleList[0];
        }else{
            musicTitle= shuffleList[nowPlaying+1];
        }
        // in shuffleList
    }
   else{ // not shuffle 상태 
    const nowPlaying = musicList.indexOf(musicTitle);
    if(nowPlaying === musicList.length-1) {
        musicTitle=musicList[0];
    }else{
        musicTitle=musicList[nowPlaying+1];
    }
   }
    changeMusic();
}

const prevMusic=function(){ // 이전 음악으로 넘기기 

    if(shuffle.classList.contains('clicked')){
        const nowPlaying= shuffleList.indexOf(musicTitle);
        if(nowPlaying === 0) {
            musicTitle=shuffleList[shuffleList.length-1];
        }else{
            musicTitle=shuffleList[nowPlaying-1];
        }
    }
    else{
        const nowPlaying = musicList.indexOf(musicTitle);
        if(nowPlaying === 0) {
            musicTitle=musicList[musicList.length-1];
        }else{
            musicTitle=musicList[nowPlaying-1];
        }
    }
    changeMusic();
}

playBtn.addEventListener('click',()=>{
    if(music_container.classList.contains('play')){
        pauseMusic();
    }
    else{
        playMusic();
    }
});

nextBtn.addEventListener('click',nextMusic);

prevBtn.addEventListener('click',prevMusic);

music1.addEventListener('ended', nextMusic);

music1.addEventListener('timeupdate',updateProgress);
// 재생 버튼 누르면 노래 재생, pause로 바꾸기
// 재생 버튼 누르면 music info 박스 나오기
// 재생 버튼 누르면 이미지 rotate

progressContainer.addEventListener('click',SetProgress);


shuffle.addEventListener('click',shuffleSongs);