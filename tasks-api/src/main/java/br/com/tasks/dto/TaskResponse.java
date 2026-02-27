package br.com.tasks.dto;

import br.com.tasks.model.Task;

public class TaskResponse {

    public Long id;
    public String title;
    public String description;
    public boolean done;

    public static TaskResponse from(Task task) {
        TaskResponse r = new TaskResponse();
        r.id = task.getId();
        r.title = task.getTitle();
        r.description = task.getDescription();
        r.done = task.isDone();
        return r;
    }
}