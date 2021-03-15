import React, { useReducer } from 'react'
import { todoReducer } from './todoReducer'

import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useForm } from './UseForm'
import { useEffect } from 'react'

const init = () => {

  return JSON.parse(localStorage.getItem('todos')) || []

  // return [{
  //   id: new Date().getTime(),
  //   desc: 'Aprender CSS',
  //   done: false

  // }]
}


function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [], init)

  const [{ description }, handleInputchange, reset] = useForm({
    description: '',

  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])

  const handleDelete = (todoId) => {
    const action = {
      type: 'delete',
      payload: todoId
    }
    dispatch(action)

  }

  const handleToggle = (todoId) => {

    dispatch({
      type: 'toggle',
      payload: todoId
    })

  }


  const handleSubmit = (e) => {
    e.preventDefault()

    if (description.trim() <= 1) {
      return
    }

    const newTodo = {
      id: new Date().getTime(),
      desc: description,//esto es lo que se envia
      done: false
    }

    const action = {
      type: 'add',
      payload: newTodo
    }
    dispatch(action)
    reset()

  }

  return (
    <div >
      <h1>TodoApp({todos.length})</h1>
      <hr />
      <div className='row'>
        <div className='col-7'>
          <ul className='list-group list-group-flush'>
            {
              todos.map((x, i) => (

                <li

                  key={x.id}>
                  <p
                    onClick={() => handleToggle(x.id)}
                    className={`${x.done && 'complete'}`}>{i + 1}.{x.desc}</p>
                  <button
                    onClick={() => handleDelete(x.id)}
                    className='btn btn-danger'>Borrar</button>
                </li>


              ))
            }
          </ul>

        </div>
        <div className='col'>
          <h4>Agregar TODO </h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              className='form-control'
              type='text'
              name='description'
              placeholder='Aprender...'
              autoComplete='off'
              onChange={handleInputchange}
              value={description}
            />
            <button
              className='btn btn-outline-primary mt-1 btn-block'
              type='submit'

            >
              Agregar
            </button>
          </form>

        </div>
      </div>






    </div>
  );
}


export default TodoApp;