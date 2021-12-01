document.addEventListener("DOMContentLoaded", () => {
  // your code here
    const form = document.querySelector('form')
    form.appendChild(createPriority())
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const inputVal = form.querySelector('#new-task-description').value
      const selectedOption = getSelectedOption()
      buildUpToDos(inputVal, selectedOption)
      form.reset()
      document.querySelector('select').selectedIndex = 0
    })
});

function buildUpToDos (toDo, selectedOption){
    const p = document.createElement('p')
    const btn = document.createElement('button')
    btn.textContent = 'x'
    p.textContent = `${toDo} `
    p.classList.add('todo')
    p.setAttribute('value', selectedOption.value)
    p.setAttribute('contenteditable', true)
    if(selectedOption.text==="high priority"){
      p.style.color = 'red'
    } else if(selectedOption.text==="medium priority"){
      p.style.color = 'yellow'
    } else {
      p.style.color = 'green'
    }
    btn.addEventListener('click', deleteTodo)
    p.appendChild(btn)
    document.querySelector('#tasks').appendChild(p)
    sortOption()
}

function deleteTodo(e){
   e.target.parentNode.remove()
}

function createPriority(){
  const options = ["high priority", "medium priority", "low priority"]
  const select = document.createElement('select')
  for (let i=0; i < 3; i++ ){ 
    const option = document.createElement('option')
    option.value = i
    option.text = options[i]
    select.appendChild(option)
  }
  return select
}

function getSelectedOption(){
  const select = document.querySelector('select')
  let option
  for (let i = 0; i < select.options.length; i++){
    option = select.options[i]
    if(option.selected === true) {
      break
    }
  }
  return option
}

function sortOption(){
  const toDos = document.querySelectorAll('.todo')
  const sorted = Array.from(toDos).sort((a,b) => {
    return a.getAttribute('value')-b.getAttribute('value')
  })
  const tasks = document.querySelector('#tasks')
  sorted.forEach(function(p){
    tasks.appendChild(p)
  })
}

