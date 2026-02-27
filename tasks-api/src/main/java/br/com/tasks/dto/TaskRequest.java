package br.com.tasks.dto;

import jakarta.validation.constraints.NotBlank;

public class TaskRequest {

    @NotBlank
    public String title;

    public String description;

    public Boolean done;
}
