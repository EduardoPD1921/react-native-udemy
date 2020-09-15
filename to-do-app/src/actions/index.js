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