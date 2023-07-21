



// localStorage.setItem('name', JSON.stringify({name: 'Maks'}))
//
// console.log(JSON.parse(localStorage.getItem('name')))

let tasks = [
    {
        id: 1,
        taskName: 'Пойти гулять',
        isImportant: false,
        isDone : false
    }
]

if (localStorage.getItem('tasks')) {
    console.log(123)
    tasks = JSON.parse(localStorage.getItem('tasks'))
}




const addSubmit = document.querySelector('.addSubmit')
const addInput = document.querySelector('.addInput')
const addCheckBox = document.querySelector('.addCheckbox')
const modal = document.querySelector('#exampleModal')
const modalError = document.querySelector('.modalError')
const modalSameTask = document.querySelector('.modalSameTask')

const taskList = document.querySelector('.taskList')


const overlay =  document.querySelector('.overlay')
const editInput =  document.querySelector('.editInput')
const editSave =  document.querySelector('.editSave')




const fillTasksList = () => {
    taskList.innerHTML = ''
    tasks.forEach((item) => {
        taskList.innerHTML += `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.taskName}</td>
            <td>${item.isDone ? 'Done' : 'InProgress'}</td>
            <td>
                <button data-id="${item.id}" type="button" class="btn  taskDoneBtn ${item.isDone ? 'btn-primary' : 'btn-outline-primary'}">Done</button>
            </td>
            <td>
            <button data-id="${item.id}" type="button" class="btn taskImportantBtn ${item.isImportant ? 'btn-warning' : 'btn-outline-warning'}">Important</button>
            </td>
            <td>
                 <button data-name="${item.taskName}" data-id="${item.id}" type="button" class="taskEditBtn btn btn-outline-info">Edit</button>
            </td>
            <td>
               <button data-id="${item.id}" type="button" class="btn btn-outline-danger taskDeleteBtn">Remove</button>
            </td>
        </tr>`
    })

    const allImportantBtn = document.querySelectorAll('.taskImportantBtn')
    const allDoneBtn = document.querySelectorAll('.taskDoneBtn')
    const allDeleteBtn = document.querySelectorAll('.taskDeleteBtn')
    const allEditBtn = document.querySelectorAll('.taskEditBtn')


    Array.from(allImportantBtn).forEach((item) => {
        item.addEventListener('click', () => {
            tasks = tasks.map((el) => {
                if (el.id == item.dataset.id ) {
                    return {...el, isImportant : !el.isImportant}
                }
                return el
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
            fillTasksList()
        })
    })

    Array.from(allDoneBtn).forEach((item) => {
        item.addEventListener('click', () => {
            tasks = tasks.map((el) => {
                if (el.id == item.dataset.id ) {
                    return {...el, isDone : !el.isDone}
                }
                return el
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
            fillTasksList()
        })
    })

    Array.from(allDeleteBtn).forEach((item) => {
        item.addEventListener('click', () => {
            tasks = tasks.filter((el) => {
                return el.id != item.dataset.id
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
            fillTasksList()
        })
    })

    Array.from(allEditBtn).forEach((item) => {
        item.addEventListener('click', () => {
           overlay.style.display = 'flex'
           editInput.value = item.dataset.name
            editSave.dataset.id = item.dataset.id
        })
    })



}



addInput.addEventListener('input', () => {
    if (addInput.value.length >= 3) {
        modalError.style.display = 'none'
        if (tasks.some(item => item.taskName.toLowerCase() === addInput.value.toLowerCase())) {
            modalSameTask.style.display = 'block'
            addSubmit.removeAttribute('data-bs-dismiss' )
            addSubmit.removeAttribute('aria-label')
        } else {
            modalSameTask.style.display = 'none'
            addSubmit.setAttribute('data-bs-dismiss', 'modal')
            addSubmit.setAttribute('aria-label', 'Close')
        }
    } else {
        addSubmit.removeAttribute('data-bs-dismiss' )
        addSubmit.removeAttribute('aria-label')
        modalError.style.display = 'block'
        modalSameTask.style.display = 'none'
    }




})
addSubmit.addEventListener('click', () => {

    if (addInput.value.length >= 3  ) {
        if (!tasks.some(item => item.taskName.toLowerCase() === addInput.value.toLowerCase())) {
            const newTask = {
                id: tasks.length ? tasks.at(-1).id + 1 : 1,
                taskName: addInput.value,
                isImportant: addCheckBox.checked,
                isDone: false
            }
            tasks = [...tasks, newTask]

            modalSameTask.style.display = 'none'
            addInput.value = ''
            addCheckBox.checked = false
            addSubmit.removeAttribute('data-bs-dismiss' )
            addSubmit.removeAttribute('aria-label')
            localStorage.setItem('tasks', JSON.stringify(tasks))
            fillTasksList()

        } else {
            modalSameTask.style.display = 'block'
        }
        modalError.style.display = 'none'
    } else {
        modalError.style.display = 'block'
    }


})

overlay.addEventListener('click', (e) => {
    if (e.target.className === 'overlay') {
        overlay.style.display = 'none'
    }
})

editSave.addEventListener('click', () => {
    tasks = tasks.map((item) => {
        if (item.id == editSave.dataset.id) {
            return {...item, taskName: editInput.value}
        } else {
            return item
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    overlay.style.display = 'none'
    fillTasksList()

})

fillTasksList()