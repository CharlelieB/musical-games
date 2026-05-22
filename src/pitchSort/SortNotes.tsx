import * as Tone from "tone";
import { useRef, useEffect, useState } from "react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider } from "@dnd-kit/react";
import { NOTES, type Note } from "./notes";

function getCorrectAnswer(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => NOTES.indexOf(b) - NOTES.indexOf(a));
}

function isCorrect(userAnswer: Note[], notes: Note[]): boolean {
  const correct = getCorrectAnswer(notes);
  console.log("correct : ", correct);
  return userAnswer.every((note, i) => note === correct[i]);
}

function Sortable({
  id,
  index,
  onPlay,
}: {
  id: string;
  index: number;
  onPlay: (note: string) => void;
}) {
  const { ref } = useSortable({ id, index });

  return (
    <li
      style={{ listStyle: "none", marginBottom: "2px" }}
      ref={ref}
      className="note-btn"
      onClick={() => onPlay(id)}
    >
      **
    </li>
  );
}

function SortNotes({
  notes,
  onLevelComplete,
}: {
  notes: Note[];
  onLevelComplete: (score: number) => void;
}) {
  const [items, setItems] = useState(notes);

  const synthRef = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.4,
        release: 1.2,
      },
    }).toDestination();

    return () => {
      synthRef.current?.dispose();
    };
  }, []);

  async function playNote(note: string) {
    await Tone.start();

    synthRef.current?.triggerAttackRelease(note, "8n");
  }

  function handleValidate() {
    console.log(items);
    if (isCorrect(items, notes)) {
      console.log("GAGNÉ, BRAVO");
      onLevelComplete(1);
    } else {
      console.log("PERDU, DOMMAGE");
      onLevelComplete(0);
    }
  }

  return (
    <>
      <section id="center">
        <div>
          <DragDropProvider
            onDragEnd={(event) => {
              if (event.canceled) return;

              const { source } = event.operation;

              if (isSortable(source)) {
                const { initialIndex, index } = source;

                if (initialIndex !== index) {
                  setItems((items) => {
                    const newItems = [...items];
                    const [removed] = newItems.splice(initialIndex, 1);
                    newItems.splice(index, 0, removed);
                    return newItems;
                  });
                }
              }
            }}
          >
            <ul className="list">
              {items.map((id, index) => (
                <Sortable key={id} id={id} index={index} onPlay={playNote} />
              ))}
            </ul>
          </DragDropProvider>
        </div>
        <button>Play</button>
        <button onClick={handleValidate}>Submit</button>
      </section>
    </>
  );
}

export default SortNotes;
