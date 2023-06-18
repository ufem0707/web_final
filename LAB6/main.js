$(function () {
    var videos = ["first.mp4", "second.mp4", "third.mp4"]; // 影片列表
    var currentVideoIndex = 0; // 現在的影片
    //var musicArr = []
    var isMusicPlaying = false;
    var myVideo = $("#myVideo")[0];
    var myAudio = $("#myAudio")[0];
    var myTV = $("#TV")[0];
    var myImage = $("#myImage")[0];
    
    $("#myVideo").attr("src", "first.mp4");
    $("#playBtn").on("click", function () {
        $("#volumeDisplay").text($("#myVideo")[0].volume.toFixed(2));
        $("#progressBar")[0].max = $("#myVideo")[0].duration;
        if ($("#myVideo")[0].paused) {
            $("#myVideo")[0].play();
            $("#playBtn").text("Pause");
        } else {
            $("#myVideo")[0].pause();
            $("#playBtn").text("Play");
        }
    });
    $("#fullBtn").on("click", function () {
        $("#myVideo")[0].webkitEnterFullscreen();
    });
    $("#lowerVolumeBtn").on("click", downVolume);
    $("#higherVolumeBtn").on("click", upVolume);
    $("#myVideo").on("timeupdate", updateProgress);
    $("#progressBar").on("change", changeProgress);

    $("#doubleSpeed").on("click", function () {
        $("#myVideo")[0].playbackRate = 2.0; // 播放速度2倍
    });
    $("#originalSpeed").on("click", function () {
        $("#myVideo")[0].playbackRate = 1.0; // 播放速度正常
    });
    $("#halfSpeed").on("click", function () {
        $("#myVideo")[0].playbackRate = 0.5; // 播放速度0.5倍
    });


    $("#prevVideo").on("click", function () {
        if (currentVideoIndex > 0) {
          currentVideoIndex--;
        }
        else if(currentVideoIndex == 0){
            currentVideoIndex = 2;
        }
        $("#myVideo").attr("src", videos[currentVideoIndex]);
        $("#myVideo")[0].load(); // 重新加載
        $("#myVideo")[0].play(); // 播放新影片
      });
    
      $("#nextVideo").on("click", function () {
        if (currentVideoIndex < videos.length - 1){
            currentVideoIndex++;
        }
        else if(currentVideoIndex == videos.length - 1){
            currentVideoIndex = 0;
        }

        $("#myVideo").attr("src", videos[currentVideoIndex]);
        $("#myVideo")[0].load(); 
        $("#myVideo")[0].play(); 
      });

      $("#musicBtn").on("click", function () {
        myVideo.pause();
        $("#playBtn").text("Play");

        if (!isMusicPlaying) {
            myVideo.style.display = "none";
            myImage.style.display = "block";
            if ($("#myAudio")[0].paused) {
                $("#myAudio")[0].play();
                $("#musicBtn").text("Pause Music");
                $("#channel").hide();
                $("#fullBtn").hide();
                $("#playBtn").hide();
            } else {
                $("#myAudio")[0].pause();
                $("#musicBtn").text("Play Music");
                $("#channel").show();
                $("#fullBtn").show();
                $("#playBtn").show();
            }
            isMusicPlaying = true;
        } else {
            myVideo.style.display = "block"; 
            myImage.style.display = "none"; 
            myAudio.pause();
            $("#musicBtn").text("Play Music");
            isMusicPlaying = false;
            $("#channel").show();
            $("#fullBtn").show();
            $("#playBtn").show();
        }
    });
      
});

function downVolume() {
    varmyVideo = $("#myVideo")[0];
    if (myVideo.volume == 0) {
    } else if (myVideo.volume < 0.1) {
        myVideo.volume = 0;
    } else {
        myVideo.volume = myVideo.volume - 0.1;
    }
    volumeDisplay.innerHTML = myVideo.volume.toFixed(2);
}

function upVolume() {
    varmyVideo = $("#myVideo")[0];
    if (myVideo.volume == 1) {
    } else if (myVideo.volume > 0.9) {
        myVideo.volume = 1;
    } else {
        myVideo.volume = myVideo.volume + 0.1;
    }
    volumeDisplay.innerHTML = myVideo.volume.toFixed(2);
}
function updateProgress(){ 
    $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime)); 
    $("#timeDisplay").append(`/${Math.floor($("#myVideo")[0].duration)}秒`); 
    $("#progressBar")[0].value = $("#myVideo")[0].currentTime; 
} 

function changeProgress(){ 
    $("#myVideo")[0].currentTime = $("#progressBar")[0].value; 
}