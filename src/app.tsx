import { NoteCard } from "./components/note-card";

import { notesFakeData } from "./utils/notesFakeData";

import logo from "./assets/logo-nlw-expert.svg";

export function App() {
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
        <div className="rounded-md bg-slate-700 p-5 space-y-3">
          <span className="text-sm font-medium text-slate-200">Add note</span>

          <p className="text-sm leading-6 text-slate-400">
            Record an audio note that will be converted to text automatically.
          </p>
        </div>

        {notesFakeData.map((fakeData) => (
          <NoteCard
            key={Math.random()}
            title={fakeData.title}
            body={fakeData.body}
          />
        ))}
      </div>
    </div>
  );
}
