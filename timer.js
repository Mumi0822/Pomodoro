const pomodoro={
    min:1,
    sec:0,
    countime:1,
    interval:30,//作業時間
    restInterval:5,//休憩時間
    timer_id:0,
    setnum:1,
    state:true,
    goaltime:new Date(),
    runaudio:new Audio('cooking.mp3'),
    element:document.getElementById('volbtn'),
    pomoinputChange(){
        runaudio.volume=this.element.value;
    },
    pomoStart(){//ボタン押したとき
        this.countime = 1;
        this.state = false;
        this.goaltime = new Date();
        this.element.addEventListener('input', this.pomoinputChange);
        this.goaltime.setMinutes(this.goaltime.getMinutes() +this.interval);
        clearTimeout(pomodoro.timer_id);
        this.runaudio.loop= true;
        this.runaudio.currentTime = 0;
        this.runaudio.play();
        reload();
    },
    pomoTimer(now){//残り時間算出
        this.countime = this.goaltime.getTime()-now.getTime();
        if(this.countime>this.restInterval*60000){//休憩ですか
            this.state =true;
        }else{
            this.state =false;
        }
        this.sec = Math.floor(this.countime/1000) % 60;
        this.min = Math.floor(this.countime/1000/60) % 60;
        //this.hours = Math.floor(this.counttime/1000/60/60) % 24;
    },
    pomoShow(){//画面表示
        let m = document.getElementById('min');
        let s = document.getElementById('sec');
        m.innerText = this.min;
        s.innerText = this.sec;
        if(this.state){
            m.style.color = "red";
            s.style.color = "red";
        }else{
            m.style.color = "black";
            s.style.color = "black";
            this.runaudio.pause();
        }
    }
};

function reload(){ //タイマーループ
    const nowtime = new Date();
    pomodoro.pomoTimer(nowtime);
    pomodoro.pomoShow();
    if(pomodoro.countime>0){
        pomodoro.timer_id=setTimeout(reload, 1000);
        console.log(pomodoro.countime); 
    }else{
        console.log("stop");
        clearTimeout(pomodoro.timer_id);
        pomodoro.pomoStart();
    }    
       
};

