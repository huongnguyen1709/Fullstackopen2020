import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    const { good, neutral, bad, totalNumber } = props

    if (totalNumber !== 0) {
        const average = (good * 1 + neutral * 0 + bad * -1) / totalNumber
        const positive = decimalRound((good / totalNumber * 100), 1)
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <tbody>
                        <Statistic text="good" value={good} />
                        <Statistic text="neutral" value={neutral} />
                        <Statistic text="bad" value={bad} />
                        <Statistic text="all" value={totalNumber} />
                    </tbody>
                </table>

                <div>average {average}</div>
                <div>positive {positive}%</div>
            </div>
        )
    } else { return <p>No feedback given</p> }

}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const decimalRound = (num, dec) => {
    if ((typeof num !== 'number') || (typeof dec !== 'number'))
        return false;

    return (Math.round((num * Math.pow(10, dec))) / Math.pow(10, dec)).toFixed(dec);
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const totalNumber = good + neutral + bad

    return (
        <div style={{ marginLeft: '10px' }}>
            <h1>give feedback</h1>

            <Button handleClick={() => setGood(good + 1)} text="Good"></Button>
            <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"></Button>
            <Button handleClick={() => setBad(bad + 1)} text="Bad"></Button>


            <Statistics good={good} neutral={neutral} bad={bad} totalNumber={totalNumber} />
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);