import SortNotes from "./SortNotes";
import { useState } from "react";
import { generateSequence } from "./generateSequence";

function Sort() {
  const [totalScore, setTotalScore] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);

  const levels = Array.from({ length: 10 }, (_, i) =>
    generateSequence(4 + Math.floor(i / 3)),
  );

  function handleLevelComplete(levelScore: number) {
    const newScore = totalScore + levelScore;
    setTotalScore(newScore);

    // if (levelIndex + 1 >= levels.length) {
    //   setPhase("finished");
    // } else {
    setLevelIndex(levelIndex + 1);
    // }
  }

  console.log("tesst ", levels);
  return (
    <>
      <section id="center">
        <div>
          <h1>Sort from lowest to higest note</h1>
          <SortNotes
            key={levelIndex}
            notes={levels[levelIndex]}
            onLevelComplete={handleLevelComplete}
          />
        </div>
      </section>
    </>
  );
}

export default Sort;
