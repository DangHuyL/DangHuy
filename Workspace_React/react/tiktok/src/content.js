import { useRef, useState, useEffect, memo } from 'react'
//1. update DOM

// init state
const initState = 0
// Actions
const UP_ACTION = 'up'
const DOWN_ACTION = 'DOWN'
// reducer
const reducer = (state, action) => {
    switch(action) {
        case UP_ACTION: 
            return state + 1
        case DOWN_ACTION: 
            return state -1 
        default:
            throw new Error('Invalid action') 
    }

}
function Content({onIncrease}) {
    console.log('re-render')
    return (
        <div>
            <h1>HELLO ANH EM VIET NAM </h1>
            <button onClick = {onIncrease}>Increase</button>
        </div>
    )
}

export default memo(Content)