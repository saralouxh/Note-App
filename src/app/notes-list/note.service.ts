import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'https://notes-api-wj1u.onrender.com/notes';
  currentUserNotes = [];
  currentUserNotesSubject: Subject<any> = new Subject;
  updatedNoteSubject: Subject<any> = new Subject;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  searchNotes(term: string){
    const token = this.authService.getToken();
    return this.http.get(`${this.apiUrl}/search?term=${term}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

  fetchNotes(){
    const token = this.authService.getToken();
    return this.http.get(`${this.apiUrl}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

  fetchNoteById(id){
    const token = this.authService.getToken();

    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

  createNote(note){
    const token = this.authService.getToken();

    return this.http.post(`${this.apiUrl}`, note, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

  setNotes(notes){
    this.currentUserNotes = notes;
    this.currentUserNotesSubject.next(notes);
  }

  onAddNote(note){
    this.setNotes([...this.currentUserNotes, note]);
    console.log(this.currentUserNotes)
  }

  updateNote(updatedNote){
    this.updatedNoteSubject.next(updatedNote);
    const index = this.currentUserNotes.findIndex((note) => note.id === updatedNote.id)
    if (index !== -1) {
      this.currentUserNotes[index] = updatedNote;
    }
  }

  onUpdateNote(note, id){
    const token = this.authService.getToken();

    return this.http.put(`${this.apiUrl}/${id}`, note, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

  onDeleteNote(id){
    const token = this.authService.getToken();

    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

}
