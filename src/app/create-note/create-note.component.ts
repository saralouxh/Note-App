import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NoteService } from '../notes-list/note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent {
  showForm: boolean = false;

  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  })

  constructor(private noteService: NoteService){}

  createNote(){
    this.showForm = true;
  }

  saveNote(){
    const newNote = this.noteForm.value;

    this.noteService.createNote(newNote).subscribe((res:any)=>{
      console.log(res);
      this.noteService.onAddNote(res.note);
      this.noteForm.reset();
    });
  }

  cancelNote(){
    this.showForm = false;
    this.noteForm.reset();
  }
}
