const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const Header = () => {
    return <h1>{course}</h1>;
  };

  const Part1 = () => {
    return (
      <p>
        {part1} {exercises1}
      </p>
    );
  };

  const Part2 = () => {
    return (
      <p>
        {part2} {exercises2}
      </p>
    );
  };

  const Part3 = () => {
    return (
      <p>
        {part3} {exercises3}
      </p>
    );
  };

  const Content = () => {
    return (
      <div>
        <Part1 />
        <Part2 />
        <Part3 />
      </div>
    );
  };

  const Total = () => {
    return (
      <p>
        Number of exercises {""}
        {exercises1 + exercises2 + exercises3}
      </p>
    );
  };

  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  );
};

export default App;

// The Exercise gives the example with (props) but I don't see why I should use (props) to achieve this. In any case, below is the code with (props).

// const Header = (props) => {
//   return <h1>{props.course}</h1>;
// };

// const Content = (props) => {
//   return (
//     <div>
//       <p>
//         {props.part1} {props.exercises1}
//       </p>
//       <p>
//         {props.part2} {props.exercises2}
//       </p>
//       <p>
//         {props.part3} {props.exercises3}
//       </p>
//     </div>
//   );
// };

//   const Total = (props) => {
//     return (
//       <p>
//         Number of exercises {""}
//         {props.exercises1 + props.exercises2 + props.exercises3}
//       </p>
//     );
//   };

//   return (
//     <div>
//       <Header course={course} />
//       <Content
//         part1={part1}
//         part2={part2}
//         part3={part3}
//         exercises1={exercises1}
//         exercises2={exercises2}
//         exercises3={exercises3}
//       />
//       <Total
//         exercises1={exercises1}
//         exercises2={exercises2}
//         exercises3={exercises3}
//       />
//     </div>
//   );
// };
