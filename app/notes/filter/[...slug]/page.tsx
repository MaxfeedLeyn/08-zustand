import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type NotesProps = {
  params: Promise<{slug: string[]}>;
};

async function Notes({params}: NotesProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug[0] === "all" ? undefined : slug[0];
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
}

export default Notes;
