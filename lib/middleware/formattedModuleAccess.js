export const formattedModuleAccess = (role) => role?.module_access && Array.isArray(role?.module_access) && role?.module_access.map((module) => {
    const permissions = role.module_access?.map((module) => ({
        module_name: module.module_name,
        permissions: { ...module.permissions },
    })) || [];
    return { module_name: module.module_name, permissions };
});