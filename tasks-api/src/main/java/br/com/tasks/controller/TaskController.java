package br.com.tasks.controller;

import java.util.List;

import br.com.tasks.dto.TaskRequest;
import br.com.tasks.dto.TaskResponse;
import br.com.tasks.service.TaskService;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/tasks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TaskController {

    @Inject
    TaskService service;

    @GET
    public List<TaskResponse> list() {
        return service.listAll().stream()
                .map(TaskResponse::from)
                .toList();
    }

    @GET
    @Path("/{id}")
    public TaskResponse get(@PathParam("id") Long id) {
        return TaskResponse.from(service.getById(id));
    }

    @POST
    public Response create(@Valid TaskRequest request) {
        return Response.status(Response.Status.CREATED)
                .entity(TaskResponse.from(service.create(request)))
                .build();
    }

    @PUT
    @Path("/{id}")
    public TaskResponse update(@PathParam("id") Long id,
                               @Valid TaskRequest request) {
        return TaskResponse.from(service.update(id, request));
    }
}
