import { combineReducers, createStore } from 'react-redux'

// actions.js
export const updateMinPower = minPower => ({
    type: 'UPDATE_MIN_POWER',
    minPower
})

export const updateMinDistance = minDistance => ({
    type: 'UPDATE_MIN_DISTANCE',
    minDistance
})

// reducers.js
export const updates = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_MIN_POWER':
            return action.minPower
        case 'UPDATE_MIN_DISTANCE':
            return action.minDistance
        default:
            return state
    }
}

export const reducers = combineReducers({
    updates
})

// store.js
export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store
}

export const store = configureStore()