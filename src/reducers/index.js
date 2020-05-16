import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const INTIAL_STATE = {
    isLoading: false,
    data: null
}

const quizeData = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_QUIZE':
            return action.payload;
        case 'INITIATE':
            return INTIAL_STATE;
        default:
            return state;
    }
}
const currentQuestion = (state = 0, action) => {
    if (action.type === 'FORWARD_QUESTION')
        return state + 1;
    if (action.type === 'INITIATE')
        return 0;
    return state;
}
const correctQuestion = (state = 0, action) => {
    if (action.type === 'CORRECTED_QUESTION')
        return state + 1;
    if (action.type === 'INITIATE')
        return 0;
    return state;
}
export default combineReducers({
    quizeData: quizeData,
    currentQuestion: currentQuestion,
    correctQuestion: correctQuestion,
    form: formReducer
});