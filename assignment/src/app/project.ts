export interface Project {
    project_name: string;
    project_code: string;
    project_manager: string;
    project_description: string;
    project_start_date: Date;
    project_end_date: Date;
    project_budget: number;
    team_members: {
        member_id: string;
        member_name: string;
    }
};

