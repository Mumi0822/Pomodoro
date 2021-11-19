const pomodoro={
    min:1,
    sec:0,
    countime:1,
    interval:30,
    restInterval:5,
    timer_id:0,
    setnum:1,
    setbtn:true,
    goaltime:new Date(),
    pomoStart(){//ボタン押したとき
        this.countime = 1;
        this.goaltime = new Date();
        this.goaltime.setMinutes(this.goaltime.getMinutes() +this.interval);
        clearTimeout(pomodoro.timer_id);
        reload();
    },
    pomoTimer(now){//残り時間算出
        this.countime = this.goaltime.getTime()-now.getTime();
        //console.log(this.counttime);
        //console.log(this.goaltime);
        //console.log(now);
        this.sec = Math.floor(this.countime/1000) % 60;
        this.min = Math.floor(this.countime/1000/60) % 60;
        //this.hours = Math.floor(this.counttime/1000/60/60) % 24;
    },
    pomoShow(){//画面表示
        let m = document.getElementById('min');
        let s = document.getElementById('sec');
        m.innerText = this.min;
        s.innerText = this.sec;
        if(this.countime>300000){
            m.style.color = "red";
            s.style.color = "red";
        }else{
            m.style.color = "black";
            s.style.color = "black";
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

