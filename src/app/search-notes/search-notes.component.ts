import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../notes-list/note.service';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.css']
})
export class SearchNotesComponent implements OnInit {
  searchQuery: string = '';
  filteredNotes: Note[] = [];
  showForm: boolean = false;

  constructor(private route: ActivatedRoute, private noteService: NoteService) {}

  ngOnInit(): void {
    // Retrieve the search query from the route's query parameters
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.filterNotes();
    });
  }

  filterNotes() {
    this.noteService.searchNotes(this.searchQuery).subscribe((response: any) => {
      this.filteredNotes = response.notes;
      console.log(this.filteredNotes);
    });
  }
 
}
