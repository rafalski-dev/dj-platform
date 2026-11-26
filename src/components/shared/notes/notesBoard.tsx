"use client";

import { createNoteAction, deleteNoteAction, updateNoteAction } from "@/actions/notes";
import { EmptyState } from "@/components/admin/shared/emptyState";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { ControlledTextarea } from "@/components/shared/form/textareaField";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/shadcn/alert-dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import type { EventNote } from "@/data/notes";
import { noteSchema, NoteType } from "@/validation/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotebookPenIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo, useState, useTransition } from "react";
import { FieldPath, useForm } from "react-hook-form";

type NotesBoardProps = {
  eventId: string;
  notes: EventNote[];
  // the logged-in user – only their own notes get Edit and Delete
  currentUserId: string;
};

// Shared notes of an event, like a small notes app: the couple and the DJ both read them,
// each person edits and deletes only their own. Used in the client panel and the admin event page.
export function NotesBoard({ eventId, notes, currentUserId }: NotesBoardProps) {
  const t = useTranslations("Notes");
  // one form open at a time – adding a new note or editing one
  const [editing, setEditing] = useState<"new" | string | null>(null);

  return (
    <Card size="md">
      <GeneralCardHeader
        title={t("title")}
        icon={<NotebookPenIcon />}
        count={notes.length}
        orientation="horizontal"
        action={
          editing === "new"
            ? undefined
            : {
                onActionBtnClick: () => setEditing("new"),
                btnLabel: t("add"),
                btnIcon: <PlusIcon />,
              }
        }
      />
      <CardContent className="flex flex-col gap-3">
        {editing === "new" && (
          <NoteForm
            defaultValues={{ content: "" }}
            submitLabel={t("save")}
            onSubmit={(data) => createNoteAction(eventId, data)}
            onDone={() => setEditing(null)}
          />
        )}

        {notes.length === 0 && editing !== "new" && (
          <EmptyState
            icon={<NotebookPenIcon />}
            title={t("empty.title")}
            description={t("empty.description")}
          />
        )}

        {notes.map((note) =>
          editing === note.id ? (
            <NoteForm
              key={note.id}
              defaultValues={{ content: note.content }}
              submitLabel={t("saveChanges")}
              onSubmit={(data) => updateNoteAction(note.id, data)}
              onDone={() => setEditing(null)}
            />
          ) : (
            <NoteItem
              key={note.id}
              note={note}
              isOwn={note.author?.id === currentUserId}
              onEdit={() => setEditing(note.id)}
            />
          ),
        )}
      </CardContent>
    </Card>
  );
}

type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

function NoteForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onDone,
}: {
  defaultValues: NoteType;
  submitLabel: string;
  onSubmit: (data: NoteType) => Promise<ActionResult>;
  onDone: () => void;
}) {
  const t = useTranslations("Notes");
  const schema = useMemo(() => noteSchema(t), [t]);
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty },
  } = useForm<NoteType>({ defaultValues, resolver: zodResolver(schema) });

  async function submit(formData: NoteType) {
    const response = await onSubmit(formData);

    if (!response.success) {
      toast.add({ type: "error", title: t("toast.errorTitle"), description: response.message });
      if (response.errors) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as FieldPath<NoteType>, { message });
        });
      }
      return;
    }

    toast.add({ type: "success", title: response.message });
    onDone();
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submit)}
      className="border-border-strong flex flex-col gap-3 rounded-xl border p-4"
    >
      <ControlledTextarea
        control={control}
        name="content"
        label={t("fields.content.label")}
        placeholder={t("fields.content.placeholder")}
        counter={2000}
        required
      />
      <div className="flex flex-row justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onDone} disabled={isSubmitting}>
          {t("cancel")}
        </Button>
        <Button type="submit" size="sm" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? (
            <>
              <Spinner />
              {t("saving")}
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}

function NoteItem({
  note,
  isOwn,
  onEdit,
}: {
  note: EventNote;
  isOwn: boolean;
  onEdit: () => void;
}) {
  const t = useTranslations("Notes");
  const format = useFormatter();

  // "You", "DJ" or the client's name – a deleted account leaves the note without an author
  const author = isOwn
    ? t("author.you")
    : note.author?.role === "Admin"
      ? t("author.dj")
      : (note.author?.name ?? t("author.deleted"));
  const date = format.dateTime(note.createdAt, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const edited = note.updatedAt.getTime() - note.createdAt.getTime() > 1000;

  return (
    <article className="bg-foreground/5 flex flex-col gap-2 rounded-xl p-4">
      <div className="flex flex-row items-start justify-between gap-3">
        <p className="text-muted-foreground min-w-0 text-xs">
          {author} · {date}
          {edited && ` · ${t("edited")}`}
        </p>
        {isOwn && (
          <div className="flex shrink-0 flex-row gap-1">
            <Button variant="ghost" size="icon-sm" aria-label={t("edit")} onClick={onEdit}>
              <PencilIcon />
            </Button>
            <DeleteNoteDialog noteId={note.id} />
          </div>
        )}
      </div>
      <p className="text-[15px] font-light wrap-break-word whitespace-pre-wrap">{note.content}</p>
    </article>
  );
}

function DeleteNoteDialog({ noteId }: { noteId: string }) {
  const t = useTranslations("Notes");
  const [isPending, startTransition] = useTransition();

  async function onDelete() {
    const response = await deleteNoteAction(noteId);
    toast.add({
      type: response.success ? "success" : "error",
      title: response.success ? response.message : t("toast.errorTitle"),
      description: response.success ? undefined : response.message,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={t("delete.button")}>
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogTitle>{t("delete.title")}</AlertDialogTitle>
        <AlertDialogDescription>{t("delete.description")}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={() => startTransition(onDelete)}>
            {isPending ? <Spinner /> : <Trash2Icon />}
            {t("delete.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
