

let tasks = [
    {
        id: 1,
        taskName: 'Пойти гулять',
        isImportant: false,
        isDone : false
    }
]

const addSubmit = document.querySelector('.addSubmit')
const addInput = document.querySelector('.addInput')
const addCheckBox = document.querySelector('.addCheckbox')
const modal = document.querySelector('#exampleModal')
const modalError = document.querySelector('.modalError')

const taskList = document.querySelector('.taskList')

const fillTasksList = () => {
    taskList.innerHTML = ''
    tasks.forEach((item) => {
        taskList.innerHTML += `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.taskName}</td>
            <td>${item.isDone ? 'Done' : 'InProgress'}</td>
            <td>
                <button type="button" class="btn btn-outline-primary">Done</button>
            </td>
            <td>
            <button data-id="${item.id}" type="button" class="btn taskImportantBtn ${item.isImportant ? 'btn-warning' : 'btn-outline-warning'}">Important</button>
            </td>
            <td>
            Edit
            </td>
            <td>
            Remove
            </td>
        </tr>`
    })

    const allImportantBtn = document.querySelectorAll('.taskImportantBtn')


    Array.from(allImportantBtn).forEach((item) => {
        item.addEventListener('click', () => {
            tasks = tasks.map((el) => {
                if (el.id == item.dataset.id ) {
                    return {...el, isImportant : !el.isImportant}
                }
                return el
            })
            fillTasksList()
        })
    })

}



addInput.addEventListener('change', () => {
    if (addInput.value.length >= 3) {
        addSubmit.setAttribute('data-bs-dismiss', 'modal')
        addSubmit.setAttribute('aria-label', 'Close')
        modalError.style.display = 'none'
    } else {
        addSubmit.removeAttribute('data-bs-dismiss' )
        addSubmit.removeAttribute('aria-label')
        modalError.style.display = 'block'
    }
})
addSubmit.addEventListener('click', () => {

    if (addInput.value.length >= 3) {
        const newTask = {
            id: tasks.length ? tasks.at(-1).id + 1 : 1,
            taskName: addInput.value,
            isImportant: addCheckBox.checked,
            isDone: false
        }
        tasks = [...tasks, newTask]
        modalError.style.display = 'none'
        addInput.value = ''
        addCheckBox.checked = false
        fillTasksList()

    } else {
        modalError.style.display = 'block'
    }


})

fillTasksList()