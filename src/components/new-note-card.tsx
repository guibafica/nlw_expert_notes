import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { toast } from "sonner";

interface INewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

export function NewNoteCard({ onNoteCreated }: INewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");

  const handleStartEditor = useCallback(() => {
    setShouldShowOnboarding(false);
  }, []);

  const handleContentChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);

      if (event.target.value === "") setShouldShowOnboarding(true);
    },
    []
  );

  const handleSaveNote = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      onNoteCreated(content);

      toast.success("Note created successfully!");
    },
    [content, onNoteCreated]
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 text-left p-5 gap-3 outline-none hover:ring-2 hover:ring-lime-200 focus-visible:ring-2 focus-visible:ring-lime-40">
        <span className="text-sm font-medium text-slate-200">Add note</span>

        <p className="text-sm leading-6 text-slate-400">
          Record an audio note that will be converted to text automatically.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />

        <Dialog.Content className="overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 transition-all">
            <X className="size-5" />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Add a note
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Start by{" "}
                  <button className="font-medium text-lime-400 hover:underline">
                    recording an audio note
                  </button>{" "}
                  or, if you prefer,{" "}
                  <button
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    just use text
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  onChange={handleContentChange}
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium  hover:bg-lime-500 transition-all"
            >
              Save note
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
