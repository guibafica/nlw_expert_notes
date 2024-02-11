import { ChangeEvent, useCallback, useState } from "react";
import { toast } from "sonner";

import { NoteCard } from "./components/note-card";
import { NewNoteCard } from "./components/new-note-card";

import { INoteProps } from "./interfaces/INoteProps";

import logo from "./assets/logo-nlw-expert.svg";

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<INoteProps[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) return JSON.parse(notesOnStorage);

    return [];
  });

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.body.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  const onNoteCreated = useCallback(
    (content: string) => {
      const newNote = {
        id: crypto.randomUUID(),
        date: new Date(),
        body: content,
      };

      const notesArray = [newNote, ...notes];

      setNotes(notesArray);

      // It's not allowed to pass an array to localStorage, so you must pass a text
      localStorage.setItem("notes", JSON.stringify(notesArray));
    },
    [notes]
  );

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearch(query);
  }, []);

  const handleDeleteNote = useCallback((id: string) => {
    const storedNotes = localStorage.getItem("notes");

    if (storedNotes) {
      const notesArray = JSON.parse(storedNotes);
      const newNotesArray = notesArray.filter(
        (note: INoteProps) => note.id !== id
      );

      setNotes(newNotesArray);
      localStorage.setItem("notes", JSON.stringify(newNotesArray));

      toast.success("Note deleted successfully!");
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 md:px-0">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Search your notes..."
          onChange={handleSearch}
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((currentNote) => (
          <NoteCard
            key={Math.random()}
            payload={{
              id: currentNote.id,
              date: currentNote.date,
              body: currentNote.body,
            }}
            handleDeleteNote={(noteId) => handleDeleteNote(noteId)}
          />
        ))}
      </div>
    </div>
  );
}
