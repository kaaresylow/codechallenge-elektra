package rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;


@Component
@Path("/messages")
public class MessageResource {

    @Autowired
    private MessageService messageService;

    @Autowired
    private MessageDAO messageDAO;


    @POST
    @Path("/names/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public MessageService postMessage(@PathParam("name") String name) {
        messageService.setMessage("hello " + name);
        return messageService;
    }

    @GET
    @Path("/recent")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Message> recentMessenges(){
        return messageDAO.getLatestMesseges();
    }


}
