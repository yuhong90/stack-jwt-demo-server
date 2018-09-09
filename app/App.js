import React, { Component } from 'react';

const containerStyle = {
    height: '100%',
    width: '100%'
};
const headerStyle = {
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
    margin: 10,
    fontSize: 32,
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};
const answerStyle = {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 5
};
const answerNameStyle = {
    fontSize: 24,
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
        this.timerID = setInterval(() => this.fetchUpdates(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div style={containerStyle}>
                <div id="header" style={headerStyle}>
                    <span>Why is the computer late for work?</span>
                </div>
                <div id="result" style={answerListStyle}>
                    {
                        Object.values(this.state.answers).map((attempt) => {
                            return (
                                <div style={answerBoxStyle}>
                                    <span style={answerStyle}>{attempt.answer}</span>
                                    <span style={answerNameStyle}>{attempt.name}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}