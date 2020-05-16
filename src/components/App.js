import React from 'react';
import SetTrivia from './SetTrivia';
import TriviaQuize from './TriviaQuize'
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
const App = () => {
    return (
        <div>
            <Router history={history}>
            <Switch>
                <Route path="/" exact component={SetTrivia}/>
                <Route path="/Trivia" component={TriviaQuize} />
            </Switch>
            </Router>
        </div>
    );
}

export default App;
