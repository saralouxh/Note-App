import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModel } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { SearchNotesComponent } from './search-notes/search-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    CreateNoteComponent,
    SearchNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
