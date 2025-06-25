package models

type Todo struct {
	ID          string  `json:"id"`
	Title       string  `json:"title" binding:"required"`
	Description *string `json:"description,omitempty"`
	Completed   bool    `json:"completed"`
}

type CreateTodoRequest struct {
	Title       string  `json:"title" binding:"required"`
	Description *string `json:"description,omitempty"`
}

type UpdateTodoRequest struct {
	Title       *string `json:"title,omitempty"`
	Description *string `json:"description,omitempty"`
	Completed   *bool   `json:"completed,omitempty"`
}
