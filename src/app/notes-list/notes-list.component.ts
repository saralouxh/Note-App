import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NoteService } from './note.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit{
  notesList: Note[] = [];
  showForm: boolean = false;
  selectedNote: any = null;

  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  constructor(private noteService: NoteService){}

  ngOnInit(): void {
    this.noteService.currentUserNotesSubject.subscribe((notes: Note[]) => {
      this.notesList = notes;
    });
   
    this.noteService.fetchNotes().subscribe((res:any)=>{
      console.log(res);
      this.notesList = res.notes;
      this.noteService.setNotes(this.notesList);
    });

  }

  editNote(note: Note){
    this.showForm = true;
    this.selectedNote = note;
    console.log(this.selectedNote)
    this.noteForm.patchValue({
      title: note.title,
      content: note.content
    });
  }

  saveNote(){
    const updatedNote = this.noteForm.value;
    this.noteService.onUpdateNote(updatedNote, this.selectedNote.id).subscribe({
      next: (res: any)=>{
        this.noteService.updateNote(res.note);
        this.showForm = false;
      }
    });
  }

  cancelNote(){
    this.showForm = false;
  }

  deleteNote(){
    this.noteService.onDeleteNote(this.selectedNote.id).subscribe({
      next: (res: any)=>{
        // Remove the deleted note from the notesList
        this.notesList = this.notesList.filter(note => note.id !== this.selectedNote.id);
        // Notify subscribers about the updated notesList
        this.noteService.setNotes(this.notesList);
        // Hide the form
        this.showForm = false;
      }
    });
  }
}
