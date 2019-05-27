var express = require('express');
var request = require('request');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.listen(3000);
app.get("/webhook",function(req,res){

    if(req.query["hub.verify_token"]=="try")
    {
        res.send(req.query["hub.challenge"]);
    }
});

app.post("/webhook", function(req,res){
    console.log("done");
    var msg_events = req.body.entry;
    msg_events.forEach(function(pageEntry){
        pageEntry.messaging.forEach(function(msg){
            if(msg.sender.id&&msg.message.text)
            {
                sendText(msg.sender.id,msg.message.text);
                res.sendStatus(200);
            }
            
        
    });
        
    });

});
function sendText(id,message){

    request({
        url:"https://graph.facebook.com/v2.10/me/messages?access_token=''",
        qs:{access_token:"EAAJowtD9Vd8BAHlqmxgZB3082ZCSelRwtblkDGWMOZCJjRnYEQzKI5qjKFkeUDe4pYDE9mJivG0ZCMDt0RUKNI9fIbUuAm4zZCPUsxvZAPWuXJZCTQBIIncf0XJ0RJeCniIHXWbjYwDNbrZCvyYLDzD4ZCKPFRHaZCZCToT8E9qjIwaVH7xYe250p61"},
        method:"POST",
        json :{
            recipient:{id:id},
            message:{text:message}
        }
    });
}








