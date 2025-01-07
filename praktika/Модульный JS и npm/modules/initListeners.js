import { students } from './students.js'
import { renderStudents } from './renderStudents.js'

export const initDeleteListeners = () => {
    const deleteElements = document.querySelectorAll('.delete')

    for (const deleteElement of deleteElements) {
        deleteElement.addEventListener('click', (event) => {
            event.stopPropagation() //Останавливает всплытие события вверх по дереву.
            const index = deleteElement.dataset.index
            students.splice(index, 1)
            renderStudents()
        })
    }
}

export const initStudentsListeners = () => {
    const studentsElements = document.querySelectorAll('li')

    for (const studentElements of studentsElements) {
        studentElements.addEventListener('click', () => {
            const age = studentElements.dataset.age
            alert(`Возраст студента - ${age}`)
        })
    }
}
