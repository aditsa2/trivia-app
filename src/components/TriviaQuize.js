import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import history from '../history';
import '../style/triviaQuize.css';
class TriviaQuize extends React.Component {
    state = { type: 0 };
    updateType = () => {
        this.setState({ type: 1 });
    }
    render() {
        if (this.state.type === 0)
            return <div><Question onEnd={this.updateType} /></div>;
        return (
            <div className="wraper">
                <div className="end-review">{`You have ${this.props.correctQuestion} correct questions!`}</div>
                <div className="ui button primary" onClick={() => history.push('/')}>Set A New Trivia</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        correctQuestion: state.correctQuestion
    };
}

export default connect(mapStateToProps, {})(TriviaQuize)