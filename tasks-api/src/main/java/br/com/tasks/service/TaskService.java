package br.com.tasks.service;

import java.util.List;

import br.com.tasks.dto.TaskRequest;
import br.com.tasks.model.Task;
import br.com.tasks.repository.TaskRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

@ApplicationScoped
public class TaskService {

    @Inject
    TaskRepository repository;

    public List<Task> listAll() {
        return repository.listAll();
    }

    public Task getById(Long id) {
        Task task = repository.findById(id);
        if (task == null) {
            throw new NotFoundException("Task not found");
        }
        return task;
    }

    @Transactional
    public Task create(TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.title);
        task.setDescription(request.description);
        task.setDone(request.done != null ? request.done : false);

        repository.persist(task);
        return task;
    }

    @Transactional
    public Task update(Long id, TaskRequest request) {
        Task task = getById(id);

        task.setTitle(request.title);
        task.setDescription(request.description);

        if (request.done != null)
            task.setDone(request.done);

        return task;
    }
}