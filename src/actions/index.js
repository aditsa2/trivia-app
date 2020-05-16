import history from '../history';

export const fetchQuize = formValues => async (dispatch, getState) => {
    try {
        console.log('in try');
        dispatch({ type: 'FETCH_QUIZE', payload: { data: null, isLoading: true } });
        const endpoint = `https://opentdb.com/api.php?amount=${formValues.numQuestions}&difficulty=${formValues.difficult.toLowerCase()}&type=${formValues.triviaType ===
            'Multiple' ? 'multiple' : 'boolean'}`;
        console.log(endpoint);
        await fetch(endpoint)
            .then(blob => blob.json())
            .then(data => {
                dispatch({ type: 'FETCH_QUIZE', payload: { data: data.results, isLoading: false } });
                localStorage.setItem("quizeData", JSON.stringify(data.results));
                localStorage.setItem("currentQuestion", 0);
                localStorage.setItem("correctQuestion", 0);
            });
        console.log('in try end');
        history.push('/Trivia');
    }
    catch (error) {
        const endpoint = "http://localhost:3001/quize";
        await fetch(endpoint)
            .then(blob => blob.json())
            .then(data => dispatch({ type: 'FETCH_QUIZE', payload: { data: data, isLoading: false } }));
        console.log('in catch');
        history.push('/Trivia');
    }
};
export const fetchQuizeFromLocalStorage = (data) => {
    return {
        type: 'FETCH_QUIZE',
        payload: { data: data, isLoading: false }
    };
};
export const forwardQuestion = () => {
    return {
        type: 'FORWARD_QUESTION'
    };
};
export const corrected = () => {
    return {
        type: 'CORRECTED_QUESTION'
    };
};
export const initiateState = () => {
    return {
        type: 'INITIATE'
    };
};