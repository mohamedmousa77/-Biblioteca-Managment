import {  Component, EventEmitter, Output, OnInit } from '@angular/core';
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
  // this.AuthorS.getAllAuthors().subscribe((data: Author[]) => {
  //   this.authors = data;
  //   console.table(data);  // ← Qui i dati ci sono
  //   this.dataReady = true;

  //   console.log("Dati caricati:", this.authors);

  //   this.authors.forEach((a, i) => {
  //     console.log(`Autore [${i}]`, a);
  //     console.log("Persona:", a.Persona);
  //   });
  // });
  this.AuthorS.getAllAuthors().subscribe((data: any[]) => {
    this.authors = data.map(d => ({
      casaEditrice: d.casaEditrice,
      indiceDiGradimento: d.indiceDiGradimento,
      persona: d.persona
    }));
    this.dataReady = true;
    console.log("Dati caricati:", this.authors);
        this.authors.forEach((a, i) => {
      console.log(`Autore [${i}]`, a);
      console.log("Persona:", a.persona);
    });
  });
}

deleteAuthor(id: number)
{
  this.AuthorS.deleteAuthor(id).subscribe({
        next: (response) => {
          this.authors = this.authors.filter(e => e.persona.id !== id);
        },
        error: (err) => {
          console.error('error deleting employee', err);
        }
      }
    );
}
editeAuthor(id:number, author:Author) {

}
  closeModal() {
    this.close.emit();
  }
}
