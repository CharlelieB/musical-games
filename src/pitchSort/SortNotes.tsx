import * as Tone from "tone";
import { useRef, useEffect, useState } from "react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { arrayMove } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";

type SortNotesProps = {
  data: {
    notes: string[];
  };
};

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

function SortNotes({ data }: SortNotesProps) {
  const [items, setItems] = useState(data.notes);

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
    console.log("Test :", items);
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
