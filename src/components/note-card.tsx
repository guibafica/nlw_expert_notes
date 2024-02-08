import * as Dialog from "@radix-ui/react-dialog";

interface INoteCardProps {
  title: string;
  body: string[];
}

export function NoteCard(payload: INoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {payload.title}
        </span>

        {payload.body.map((bodyText) => (
          <p className="text-sm leading-6 text-slate-400" key={Math.random()}>
            {bodyText}
          </p>
        ))}

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />

        <Dialog.Content className="overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {payload.title}
            </span>

            {payload.body.map((bodyText) => (
              <p
                className="text-sm leading-6 text-slate-400"
                key={Math.random()}
              >
                {bodyText}
              </p>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
