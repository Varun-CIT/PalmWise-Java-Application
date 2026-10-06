package com.example.palmwise_advanced.controller;

import com.example.palmwise_advanced.model.OutreachTask;
import com.example.palmwise_advanced.service.OutreachTaskService;
import com.example.palmwise_advanced.model.OfficerTaskView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/outreach")
public class OutreachTaskController {



    private final OutreachTaskService outreachTaskService;

    public OutreachTaskController(OutreachTaskService outreachTaskService) {
        this.outreachTaskService = outreachTaskService;
    }

    @GetMapping
    public List<OutreachTask> getAllTasks() {
        return outreachTaskService.getAllTasks();
    }
    @GetMapping("/status/{status}")
    public List<OutreachTask> getTasksByStatus(
            @PathVariable String status) {

        return outreachTaskService.getTasksByStatus(
                status.toUpperCase()
        );
    }

    @GetMapping("/{id}")
    public OutreachTask getTaskById(@PathVariable Long id) {
        return outreachTaskService.getTaskById(id);
    }
    @GetMapping("/{id}/officer-view")
    public OfficerTaskView getOfficerTaskView(
            @PathVariable Long id) {

        return outreachTaskService.getOfficerTaskView(id);
    }
    @PutMapping("/{id}/status")
    public OutreachTask updateTaskStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        OutreachTask task = outreachTaskService.getTaskById(id);

        if (task == null) {
            return null;
        }

        task.setStatus(status.toUpperCase());

        return outreachTaskService.updateTask(task);
    }

    @PostMapping
    public OutreachTask createTask(@RequestBody OutreachTask task) {
        return outreachTaskService.createTask(task);
    }

    @PutMapping("/{id}")
    public OutreachTask updateTask(
            @PathVariable Long id,
            @RequestBody OutreachTask task) {

        task.setId(id);
        return outreachTaskService.updateTask(task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        outreachTaskService.deleteTask(id);
        return "Outreach task deleted successfully";
    }
    @GetMapping("/officer-dashboard")
    public List<OfficerTaskView> getOfficerDashboard() {
        return outreachTaskService.getAllOfficerTasks();
    }
}