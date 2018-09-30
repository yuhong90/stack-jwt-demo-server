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
const entryListStyle = {
    width: '96%',
    margin: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
};
const entryBoxStyle = {
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
const entryNameStyle = {
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: 22,
    margin: 5
};
const entryTypeStyle = {
    fontFamily: 'Open Sans',
    fontSize: 16,
    margin: 5
};

export default class App extends Component {

    constructor() {
        super();
        this.state = { entries: {} };
    }

    fetchUpdates() {
        fetch(`/api/park/entries`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('fetched entries', result);
                    this.setState({ entries: result.entries });
                },
                (error) => {
                    this.setState({ error });
                }).catch(err => {
                    console.log('err', err);
                });
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
                    <span>Entries into the amusement park today</span>
                </div>
                <div id="result" style={entryListStyle}>
                    {
                        Object.values(this.state.entries).map((ticket) => {
                            return (
                                <div style={entryBoxStyle}>
                                    <span style={entryNameStyle}>{ticket.name}</span>
                                    <span style={entryTypeStyle}>{ticket.type}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div >
        )
    }
}