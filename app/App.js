import React, { Component } from 'react';

const containerStyle = {
    height: '100%',
    width: '100%'
};
const headerStyle = {
    fontFamily: 'Open Sans',
    fontSize: 48,
    textAlign: 'center',
    margin: 100
};
const answerListStyle = {
    width: '96%',
    margin: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
};
const answerBoxStyle = {
    minHeight: '120px',
    minWidth: '30%',
    margin: 20,
    fontSize: 32,
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};
const correctAnswerStyle = {
    background: '#F7D2C8'
};
const wrongAnswerStyle = {
    background: '#EE1C2F'
};
const answerStyle = {
    fontFamily: 'Open Sans',
    fontSize: 32,
    margin: 5
};
const answerNameStyle = {
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: 22,
    margin: 5
};

export default class App extends Component {

    constructor() {
        super();
        this.state = { answers: {} };
    }

    fetchUpdates() {
        fetch(`/api/answers`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('fetched answers', result);
                    this.setState({ answers: result.answers });
                },
                (error) => {
                    this.setState({ error });
                }).catch(err => {
                    console.log('err', err);
                })
    }

    componentDidMount() {
        this.fetchUpdates();
        this.timerID = setInterval(() => this.fetchUpdates(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div style={containerStyle}>
                <div id="header" style={headerStyle}>
                    <span>What's the object-oriented way to become wealthy?</span>
                </div>
                <div id="result" style={answerListStyle}>
                    {
                        Object.values(this.state.answers).map((attempt) => {
                            return (
                                <div style={Object.assign(answerBoxStyle, attempt.status === 'correct' ? correctAnswerStyle : wrongAnswerStyle)}>
                                    <span style={answerStyle}>{attempt.answer ? attempt.answer : ''}</span>
                                    <span style={answerNameStyle}>{attempt.name}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div >
        )
    }
}