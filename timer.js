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
        let count = this.goaltime.getTime()-now.getTime();
        this.countime = count;
        //console.log(this.counttime);
        //console.log(this.goaltime);
        //console.log(now);
        this.sec = Math.floor(count/1000) % 60;
        this.min = Math.floor(count/1000/60) % 60;
        //this.hours = Math.floor(this.counttime/1000/60/60) % 24;
    },
};

function reload(){ //タイマーループ
    const nowtime = new Date();
    pomodoro.pomoTimer(nowtime);
    document.getElementById('min').innerText = pomodoro.min;
    document.getElementById('sec').innerText = pomodoro.sec;
    if(pomodoro.countime>0){
        pomodoro.timer_id=setTimeout(reload, 1000);
        console.log(pomodoro.countime); 
    }else{
        console.log("stop");
        clearTimeout(pomodoro.timer_id);
        pomodoro.pomoStart();
    }    
       
};

