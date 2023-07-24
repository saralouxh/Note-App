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
    this.noteService.fetchNotes().subscribe((res:any)=>{
      console.log(res);
      this.notesList = res.notes;
    })
  }

  editNote(note: Note){
    this.selectedNote = note;
    this.noteForm.patchValue({
      title: note.title,
      content: note.content
    });
    this.showForm = true;
  }

  // addNote(){
  //   this.showForm = true;
  // }

  saveNote(){
    const updatedNote = this.noteForm.value;
    this.noteService.onUpdateNote(updatedNote, this.selectedNote.id).subscribe({
      next: (res: any)=>{
        this.noteService.updateNote(res.note)
      }
    })
  }
}
