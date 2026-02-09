// import * as Yup from "yup";
import css from "./NoteForm.module.css";
import type { PostNote } from "../../types/note";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";

// const CreateNoteSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title have to be at least 3 character")
//     .max(50, "Title is too long")
//     .required("Title is required"),
//   content: Yup.string().max(500, "Content is too long"),
//   tag: Yup.mixed()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//     .required("Tag has to be selected"),
// });

interface NoteFormProps {
  onClose: () => void;
}

function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const postMethod = useMutation({
    mutationFn: (note: PostNote) => {
      return createNote(note);
    },
    onSuccess: () => {
      onClose();
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handlePost = (formData: FormData) => {
    const title = formData.get("title");
    const content = formData.get("content");
    const tag = formData.get("tag");

    if (
      title &&
      typeof title === "string" &&
      content &&
      typeof content === "string" &&
      tag &&
      typeof tag === "string"
    ) {
      const noteTag = tag as PostNote["tag"];
      const note: PostNote = {
        title: title,
        content: content,
        tag: noteTag,
      };
      postMethod.mutate(note);
    }
  };

  return (
    <form className={css.form} action={handlePost}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          defaultValue={draft.title}
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={handleChange}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
