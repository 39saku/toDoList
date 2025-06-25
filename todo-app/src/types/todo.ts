export interface Todo {
    id: string;
    name: string;
    description?: string;
    completed: boolean;
    deadline?: Date;
}

export interface CreateTodoRequest {
    title: string;
    description?: string;
    deadline?: Date;
}

export interface UpdateTodoRequest {
    title?: string;
    description?: string;
    completed?: boolean;
    deadline?: Date;
}