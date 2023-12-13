import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  currentUserNotes = [];
  currentUserNotesSubject: Subject<any> = new Subject;
  updatedNoteSubject: Subject<any> = new Subject;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  fetchNotes(){
    const token = this.authService.getToken();

    return this.http.get('http://localhost:3000/notes', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

  fetchNoteById(id){
    const token = this.authService.getToken();

    return this.http.get(`http://localhost:3000/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

  createNote(note){
    const token = this.authService.getToken();

    return this.http.post('http://localhost:3000/notes', note, {
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

    return this.http.put(`http://localhost:3000/notes/${id}`, note, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

  onDeleteNote(id){
    const token = this.authService.getToken();

    return this.http.delete(`http://localhost:3000/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
  }

}
