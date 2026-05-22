import SortNotes from "./SortNotes";

function Sort() {
  return (
    <>
      <section id="center">
        <div>
          <h1>Sort from lowest to higest note</h1>
          <SortNotes data={{ notes: ["C4", "E#4", "E4", "D4"] }} />
        </div>
      </section>
    </>
  );
}

export default Sort;
