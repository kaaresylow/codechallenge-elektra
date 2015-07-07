package rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Component
@Path("/messages")
public class MessageResource {

    private MessageService messageService;

    @POST
    @Path("/names/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postMessage(@PathParam("name") String name) {
        return Response.ok(messageService.saveMessage(name)).header("Access-Control-Allow-Origin", "*").build();
    }

    @GET
    @Path("/recent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response recentMessages(){
        return Response.ok(messageService.getLatestMessages()).header("Access-Control-Allow-Origin", "*").build();
    }

    @Autowired
    public MessageResource (MessageService messageService){
        this.messageService = messageService;
    }
}
