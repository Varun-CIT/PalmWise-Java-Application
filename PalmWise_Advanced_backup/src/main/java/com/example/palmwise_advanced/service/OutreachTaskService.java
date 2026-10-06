package com.example.palmwise_advanced.service;

import com.example.palmwise_advanced.model.OutreachTask;
import com.example.palmwise_advanced.repository.OutreachTaskRepository;
import org.springframework.stereotype.Service;
import com.example.palmwise_advanced.model.Farmer;
import com.example.palmwise_advanced.model.OfficerTaskView;
import com.example.palmwise_advanced.model.Scheme;

import java.util.ArrayList;
import java.util.List;

@Service
public class OutreachTaskService {

    private final OutreachTaskRepository outreachTaskRepository;
    private final FarmerService farmerService;
    private final SchemeService schemeService;

    public OutreachTaskService(
            OutreachTaskRepository outreachTaskRepository,
            FarmerService farmerService,
            SchemeService schemeService) {

        this.outreachTaskRepository = outreachTaskRepository;
        this.farmerService = farmerService;
        this.schemeService = schemeService;
    }

    public List<OutreachTask> getAllTasks() {
        List<OutreachTask> tasks = new ArrayList<>();
        outreachTaskRepository.findAll().forEach(tasks::add);
        return tasks;
    }
    public List<OutreachTask> getTasksByStatus(String status) {
        return outreachTaskRepository.findByStatus(status);
    }

    public OutreachTask getTaskById(Long id) {
        return outreachTaskRepository.findById(id).orElse(null);
    }

    public OutreachTask createTask(OutreachTask task) {

        if (task.getCreatedAt() == null) {
            task.setCreatedAt(java.time.LocalDateTime.now());
        }

        return outreachTaskRepository.save(task);
    }

    public OutreachTask updateTask(OutreachTask task) {
        return outreachTaskRepository.save(task);
    }

    public void deleteTask(Long id) {
        outreachTaskRepository.deleteById(id);
    }
    public boolean taskAlreadyExists(Long farmerId, Long schemeId) {
        return outreachTaskRepository
                .existsByFarmerIdAndSchemeIdAndStatus(
                        farmerId,
                        schemeId,
                        "PENDING"
                );
    }
    public OfficerTaskView getOfficerTaskView(Long taskId) {

        OutreachTask task = getTaskById(taskId);

        if (task == null) {
            return null;
        }

        Farmer farmer = farmerService.getFarmerById(task.getFarmerId());
        Scheme scheme = schemeService.getSchemeById(task.getSchemeId());

        if (farmer == null || scheme == null) {
            return null;
        }

        return new OfficerTaskView(
                task.getId(),
                farmer.getId(),
                farmer.getName(),
                farmer.getPhone(),
                farmer.getPreferredLanguage(),
                farmer.getLocation(),
                scheme.getId(),
                scheme.getName(),
                scheme.getBenefit(),
                task.getStatus(),
                task.getPriority(),
                task.getNotes()
        );
    }
    public List<OfficerTaskView> getAllOfficerTasks() {

        List<OfficerTaskView> views = new ArrayList<>();

        for (OutreachTask task : getAllTasks()) {

            OfficerTaskView view =
                    getOfficerTaskView(task.getId());

            if (view != null) {
                views.add(view);
            }
        }

        return views;
    }
}