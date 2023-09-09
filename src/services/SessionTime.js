class SessionTime {

    getCurrentTime() {
        var d = new Date();
        var n = d.toLocaleTimeString();
        return n
    }

    compareTwoTimes(session) {
        var d = new Date();
        var n = d.toLocaleTimeString();

        var expiry = localStorage.getItem('ExpireTime');
        if (expiry < n) {
            localStorage.removeItem('userId')
            console.log('----------------Removed Session ------------------------')
            console.log('LoginTime ' + localStorage.getItem('LoginTime'))
            console.log('the min at the login time was ' + localStorage.getItem('min'))
            console.log('Expirty was ' + localStorage.getItem('ExpireTime'))
            console.log('Time now is '
                +    new Date().getHours() + "-" + new Date().getMinutes() + "-" + new Date().getSeconds())
        } else {

        }
        // alert("Time 2 is later than time 1=>>" + str1 + " - " + str2);
    }

    getMinutes(timeString){
       return timeString.split(":")[1]
        
    }



}

export default new SessionTime()
