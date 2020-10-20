import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [selected, setSelected] = useState(0)

    const length = 10
    const points = Array(length).fill(0)

    const [votes, setVotes] = useState(points)

    const largestVotes = Math.max(...votes)
    const index = votes.indexOf(largestVotes)

    const handleRandomSelected = () => {
        const random_number = Math.floor(Math.random() * 10)
        setSelected(random_number)
    }

    const handleVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    return (
        <div style={{ marginLeft: '10px' }}>
            <h2>Anecdote of the day</h2>
            <p>{props.anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button style={{ marginRight: '10px' }} onClick={() => handleVote()}>vote</button>
            <button style={{ marginBottom: '20px' }} onClick={() => handleRandomSelected()}>next anecdote</button>

            <h2>Anecdote with the most votes</h2>
            <p>{props.anecdotes[index]}</p>
            <p>has {largestVotes} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'The best way to get a project done faster is to start sooner.',
    'Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away.',
    'Program testing can be used to show the presence of bugs, but never to show their absence!',
    'Design and programming are human activities; forget that and all is lost.'
]

ReactDOM.render(
    <React.StrictMode>
        <App anecdotes={anecdotes} />
    </React.StrictMode>,
    document.getElementById('root')
);