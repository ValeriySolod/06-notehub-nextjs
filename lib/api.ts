import axios from 'axios';
import type { CreateNotePayload, Note } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(
  search = '',
  page = 1,
  perPage = 12
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page,
      perPage,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(note: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>('/notes', note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}