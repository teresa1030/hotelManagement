var dateTime = {
    
    recordTime:function(){
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var date = today.getDate();

        if(month.toString().length == 1){
            month = '0'+month;
        }
        if(date.toString().length == 1){
            date = '0'+date;
        }
        return year+'/'+month+'/'+date
    },
    recordDate:function(){
        var today = new Date();
        var ampm = 'AM';
        var minutes = today.getMinutes();
        var hour = today.getHours();
     
        if(hour.toString().length == 1){
            hour = '0'+hour;
        }else if(hour > 12){
            ampm = 'PM';
            hour -= 12;
            if(hour.toString().length == 1){
                hour = '0'+hour;
            }
        }
        if(minutes.toString().length == 1){
            minutes = '0'+minutes;
        }
        return ampm+' '+hour+':'+minutes;
    }
}




export default dateTime