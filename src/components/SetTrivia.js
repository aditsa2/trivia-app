import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import history from '../history';
import { fetchQuize,initiateState } from '../actions';
import '../style/setTrivia.css';

class SetTrivia extends React.Component {
    componentDidMount(){
        this.props.initiateState();
        localStorage.clear();
    }
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        switch (input.name) {
            case 'numQuestions': {
                return (
                    <div className={className}>
                        <label>{label}</label>
                        <input {...input} autoComplete='off' placeholder="choose number from 1 to 50" />
                        {this.checkForErrors(meta)}
                    </div>
                );
            }
            case 'Category': {
                return (
                    <div className={className}>
                        <label>{label}</label>
                        <select {...input} className="ui dropdown">
                            <option>Any Category</option>
                            <option>Sports</option>
                            <option>Art</option>
                            <option>Politics</option>
                            <option>Geography</option>
                        </select>
                    </div>
                );
            }
            case 'difficult': {
                return (
                    <div className={className}>
                        <label>{label}</label>
                        <select {...input} className="ui dropdown">
                            <option>Choose is a difficulty</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                        {this.checkForErrors(meta)}
                    </div>
                );
            }
            case 'triviaType': {
                return (
                    <div className={className}>
                        <label>{label}</label>
                        <select {...input} className="ui dropdown">
                            <option>TYPE</option>
                            <option>Multiple</option>
                            <option>True/False</option>
                        </select>
                        {this.checkForErrors(meta)}
                    </div>
                );
            }
            default:
                return;
        }

    }
    checkForErrors({ error, touched }) {
        if (error && touched)
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
    }

    onSubmit = (formValues) => {
        this.props.fetchQuize(formValues);
    }
    render() {
        let btn;
        if (this.props.isLoading)
            btn = (<div className="ui active inline loader"></div>);
        else
            btn = <button className="ui button primary">Submit</button>;
        return (
            <div className="wraper">
                <h1 className="ui header">Set Your Trivia</h1>

                <form className="form ui error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="numQuestions" component={this.renderInput} label='Number of question' />
                    <Field name="Category" component={this.renderInput} label='Select Category' />
                    <Field name="difficult" component={this.renderInput} label='Difficulty' />
                    <Field name="triviaType" component={this.renderInput} label='Select type of trivia' />
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        {btn}
                    </div>
                </form>
            </div>
        );
    }
}
const validate = values => {
    const errors = {}
    if (values.numQuestions > 50 || values.numQuestions < 1 || !values.numQuestions) {
        errors.numQuestions = 'You need to choose number from 1 to 50';
    }
    if (values.difficult === 'Choose is a difficulty' || !values.difficult)
        errors.difficult = 'You have to choose a difficulty';
    if (values.triviaType === 'TYPE' || !values.triviaType)
        errors.triviaType = 'You have to select a type';
    return errors;
}
const mapStateToProps = (state) => {
    return {
        formValues: state.form.triviaForm.values,
        isLoading: state.quizeData.isLoading
    };
}
const coneccting = connect(mapStateToProps, { fetchQuize ,initiateState})(SetTrivia)
export default reduxForm({ form: 'triviaForm', validate })(coneccting);