package com.jeevan.smart_notes_api.dto.request;

import jakarta.validation.constraints.NotNull;

public class WorkspaceRoleRequest {
    @NotNull(message = "Role is required")
    private String role; // VIEWER, EDITOR, ADMIN

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
