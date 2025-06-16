import {  Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Author } from '../../../../../models/author-model';
import { AuthorService } from '../../../../services/author-services/author.service';

@Component({
  selector: 'author-table',
  imports: [CommonModule],
  templateUrl: './author-table.component.html',
  styleUrl: './author-table.component.css'
})
export class AuthorTableComponent {
  @Output() close = new EventEmitter<void>();

  authors: Author[] = [];
  dataReady = false;

  constructor(private AuthorS: AuthorService) {}

  
  ngOnInit() {
    this.AuthorS.getAllAuthors().subscribe((data: Author[]) => {
    this.authors = data;
    console.table(data);
    this.dataReady = true;
  });


    console.log("Dati in ngOnInit:", this.authors);

    this.authors.forEach((a, i) => {
    console.log(`Autore [${i}]`, a);
    console.log("Persona:", a.Persona);
  });
  }

  closeModal() {
    this.close.emit();
  }
}
