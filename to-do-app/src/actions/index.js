export const ADD_TODO = 'ADD_TODO'
export const addTodo = text => {
    return {
        type: ADD_TODO,
        text
    }
}

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = todoId => {
    return {
        type: TOGGLE_TODO,
        todoId
    }
}

export const SET_TODO_TEXT = 'SET_TODO_TEXT'
export const setTodoText = text => {
    return {
        type: SET_TODO_TEXT,
        text
    }
}
