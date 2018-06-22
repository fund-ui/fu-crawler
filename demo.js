var CountDown = (function(){
    /**
     * 类-动态改变Dom值
     * @param {String} id 指定改变的id
     * @param {Number} time 时间间隔
     */
    function CountDown(id, time, value) {
        this.id = id;
        this.time = time;
        this.value = value;
    }
    CountDown.prototype = {
        /**
         * 方法-设置静态文本
         * @param {String} value 值
         */
        setCountDownText: function(value) {
            var time = this.time;
            var count = 0;
            setInterval(() => {
                //document.getElementById(this.id).innerText = value;
                console.log(value);
            }, time)
        },
        /**
         * 方法-设置动态递减数字
         * @param {Number} num 递减数字
         */
        setCountDownNum: function(num) {
            var time = this.time;
            var count = 0;
            setInterval(() => {
                //document.getElementById(this.id).innerText = num--;
                console.log(num--);
            }, time)
        }
    }
    return CountDown;
})()

var countDown = new CountDown("countDown_counting", 1000);
    //countDown.setCountDownText("Dengdeng");
    countDown.setCountDownNum(10);
