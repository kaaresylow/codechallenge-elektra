package rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by ksp on 08/06/15.
 */
@Component
public class MessageService {
    @Autowired
    private Message message;

    public void setMessage(String content){
        message.setContent(content);
    }

    public Message getMessage(){
        return message;
    }
}

@Component
class Message{
    private String content;
    private Timestamp timestamp;

    public void setContent(String content){
        this.content = content;
    }

    public String getContent(){
        return content;
    }

    public void setTimestamp(Timestamp timestamp){
        this.timestamp = timestamp;
    }

    public String getTimestamp() throws Exception{
        SimpleDateFormat dateFormatGmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");

        return dateFormatGmt.format(timestamp);
    }
}
