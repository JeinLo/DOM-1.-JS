import { students } from './students.js'
import { initDeleteListeners, initStudentsListeners } from './initListeners.js'

export const renderStudents = () => {
    const list = document.getElementById('list')
    const studentsHtml = students
        .map((student, index) => {
            return `<li data-age='${student.age}'><span>${student.name}</span><button class="delete" data-index="${index}">удалить</button></li>`
        })
        .join('')

    list.innerHTML = studentsHtml

    initDeleteListeners()
    initStudentsListeners()
}
