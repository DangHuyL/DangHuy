
import { useState, useReducer, useRef } from "react";
// initState
const initState = {
    job: '',
    jobs: []
}
// Action
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'
const setJob = (payLoad) => {
    return {
        type: SET_JOB,
        payLoad
    }
}
// reducer
const reducer = (state, action) => {
    let newState
    console.log("action: ", action)
    console.log('prevState: ', state)
    switch(action.type) {   
        case SET_JOB:
            newState = {
                ...state,
                job: action.payLoad
            }
        break
        default:
            throw new Error('Invalid action')
            
    }
    console.log("newState: ",newState)
    return newState
}

function App() {
    const [state, dispatch] = useReducer(reducer, initState)
    const {job, jobs} = state
    
    return (
        <div style={{padding: '0 20px'}}>
            <h3>TO DO</h3>
            <input
                value = {job}
                placeholder = 'Enter todo...'
                onChange={e => dispatch(setJob(e.target.value))}
            />
            <button>Add</button>
            <ul>

            </ul>
        </div>
    )
}

export default App






























// const [show, setShow] = useState()
    // return (
    //     <div style = {{padding: 32}}>
    //         <button onClick = {() => setShow(!show)}>Toggle</button>
    //          {show &&  <Content />}        
    //     </div>
           
    // )