import { useCallback, useState } from "react";

import { NoteCard, INoteCardProps } from "./components/note-card";
import { NewNoteCard } from "./components/new-note-card";

import logo from "./assets/logo-nlw-expert.svg";

export function App() {
  const [notes, setNotes] = useState<INoteCardProps[]>([]);

  const onNoteCreated = useCallback(
    (content: string) => {
      const newNote = {
        id: Math.random(),
        date: new Date(),
        body: [content],
      };

      setNotes([newNote, ...notes]);
    },
    [notes]
  );

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Search your notes..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {notes.map((currentNote, currentNoteIndex) => (
          <NoteCard
            key={Math.random()}
            id={currentNoteIndex}
            date={currentNote.date}
            body={currentNote.body}
          />
        ))}
      </div>
    </div>
  );
}
