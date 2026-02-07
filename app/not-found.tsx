import type { Metadata } from "next";
import css from "./NotFound.module.css";

export const metadata: Metadata = {
  title: "NotHub: NotFound",
  description: "I suppose, that you do not mean to be here (:",
  openGraph: {
    title: "NoteHub: NotFound",
    description: "I suppose, that you do not mean to be here (:",
    url: "https://notehub.com/notfound",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1536,
        height: 1024,
        alt: "NoteHub logo",
      },
    ],
  },
};

function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
