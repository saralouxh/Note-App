import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotesComponent } from './search-notes.component';

describe('SearchNotesComponent', () => {
  let component: SearchNotesComponent;
  let fixture: ComponentFixture<SearchNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchNotesComponent]
    });
    fixture = TestBed.createComponent(SearchNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
