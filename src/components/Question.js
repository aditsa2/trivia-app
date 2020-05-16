import React from 'react';
import { connect } from 'react-redux';
import { forwardQuestion, corrected, fetchQuizeFromLocalStorage } from '../actions';
import _ from 'lodash';
import '../style/question.css';
class Question extends React.Component {
    componentDidMount() {
        this.props.fetchQuizeFromLocalStorage(JSON.parse(localStorage.getItem("quizeData")));
        for (let i = 1; i <= Number(localStorage.getItem("correctQuestion")); i++)
            this.props.corrected();
        for (let i = 1; i <= Number(localStorage.getItem("currentQuestion")); i++)
            this.props.forwardQuestion();
    }
    inTimeout = false;
    handleClick = (e) => {
        if (this.inTimeout) return;
        this.inTimeout = true;
        if (e.target.id === 'correct') {
            e.target.classList.add('corrected');
            localStorage.setItem("correctQuestion", Number(localStorage.getItem("correctQuestion")) + 1);
            this.props.corrected();
        }
        else {
            e.target.classList.add('wornged');
            document.querySelector('#correct').classList.add('corrected');
        }
        if (this.props.quizeData.length - 1 === this.props.currentQuestion) {
            setTimeout(() => {
                document.querySelectorAll('.worng').forEach(worng => worng.classList.remove('wornged'));
                document.querySelector('#correct').classList.remove('corrected');
                this.inTimeout = false;
                this.props.onEnd();
            }, 1000);
            return;
        }
        setTimeout(() => {
            document.querySelectorAll('.worng').forEach(worng => worng.classList.remove('wornged'));
            document.querySelector('#correct').classList.remove('corrected');
            this.inTimeout = false;
            localStorage.setItem("currentQuestion", Number(localStorage.getItem("currentQuestion")) + 1);
            this.props.forwardQuestion();
        }, 1000);
    }

    render() {
        // const currentData = JSON.parse(localStorage.getItem("quizeData"))[this.props.currentQuestion];
        if (!this.props.quizeData) return <div>loading..</div>;
        const currentData = this.props.quizeData[this.props.currentQuestion];
        const question = currentData.question;
        const correctAnswer = <div className="answer" onClick={(e) => this.handleClick(e)} key='correct' id="correct">{currentData.correct_answer}</div>
        const worngAnswers = currentData.incorrect_answers.map((answer, i) => <div onClick={(e) => this.handleClick(e)} key={`worng${i}`} className="answer worng">{answer}</div>)
        const allAnswers = _.shuffle([...worngAnswers, correctAnswer]);

        return <div className="questionCard">
            <div className="question">{question}</div>
            {allAnswers}
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        quizeData: state.quizeData.data,
        currentQuestion: state.currentQuestion
    };
}

export default connect(mapStateToProps, { forwardQuestion, corrected, fetchQuizeFromLocalStorage })(Question)