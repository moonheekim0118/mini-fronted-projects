# Custom video player

### Requirement
- 동영상 자체나 play button을 누를 시 동영상이 play 된다.
- 동영상이 재생중이라면 play button의 모양을 pause로 바꾸어준다.
- 현재 동영상 재생시간을 timestamp로 찍어서 보여준다.
- progress bar를 구현하여 재생시간에 맞게 bar가 움직이도록 한다.
- bar를 옮기면 동영상 재생 역시 그에 맞춰 변경되도록 한다.


- 동영상의 progress bar와 timestamp 이벤트를 처리하는 함수
```javascript

video.addEventListener('timeupdate', updateProgress);

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
```

- progress bar를 옮겼을 때, 동영상 재생 구간을 변경해주는 이벤트를 처리하는 함수
```javascript

progress.addEventListener('change', setVideoProgress );

function setVideoProgress(){ // 옮겨진 prgoress로 current time을 옮겨준다. 
    video.currentTime =(+progress.value)*video.duration / 100;
}

```