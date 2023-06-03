import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const initialVotes = new Array(anecdotes.length).fill(0);

const DisplayAnecdote = (props) => {
  return <p>{anecdotes[props.selected]}</p>;
};

const DisplayVotes = (props) => {
  return <p>has {props.votes} votes</p>;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const AnecdoteOfDay = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote selected={props.selected} />
      <DisplayVotes votes={props.votes[props.selected]} />
      <Button
        handleClick={() => {
          props.handleVoteClick(props.selected);
        }}
        text="vote"
      />
      <Button handleClick={props.handleNextClick} text="next anecdote" />
    </div>
  );
};

const AnecdoteMostVotes = (props) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote selected={props.selected} />
      <DisplayVotes votes={props.votes[props.selected]} />
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);
  let [highest, setHighest] = useState(0);

  const handleNextClick = () => {
    const getRandomInt = (maxNumber) => {
      return Math.floor(Math.random() * maxNumber);
    };
    setSelected(getRandomInt(anecdotes.length));
  };

  const handleVoteClick = (index) => {
    const updatedVotes = votes.map((c, i) => {
      if (i === index) {
        return c + 1;
      } else {
        return c;
      }
    });
    setVotes(updatedVotes);
    setHighest((highest = updatedVotes.indexOf(Math.max(...updatedVotes))));
  };

  return (
    <div>
      <AnecdoteOfDay
        selected={selected}
        votes={votes}
        handleNextClick={handleNextClick}
        handleVoteClick={handleVoteClick}
      />
      <AnecdoteMostVotes selected={highest} votes={votes} />
    </div>
  );
};

export default App;
