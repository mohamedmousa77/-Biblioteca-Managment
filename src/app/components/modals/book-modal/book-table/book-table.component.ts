import { Component,EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../../models/book-model';
import { BookService } from '../../../../services/book-services/book.service';
@Component({
  selector: 'book-table',
  imports: [CommonModule],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent {
  @Output() close = new EventEmitter<void>();

  books: Book[] = [];
  dataReady:boolean = false

  constructor(private bs: BookService) {  }

  ngOnInit() { 
  this.bs.getAllBooks().subscribe( (data: Book[]) => {
    this.books = data.map(d => ({
      annoPubblicazione: d.annoPubblicazione,
      autore: d.autore,
      casaEditrice: d.casaEditrice,
      genere: d.genere,
      isbn: d.isbn,
      quantitaMagazzino: d.quantitaMagazzino,
      titolo: d.titolo,
      id: d.id
    }));
    this.dataReady = true;
    console.log("Dati caricati:", this.books);
        this.books.forEach((a, i) => {
      console.log(`Libro [${i}]`, a);
      console.log("Persona:", a.titolo);
    });
  })
  }

  deleteBook(id:number) {

  this.bs.deleteBook(id).subscribe({
        next: (response) => {
          this.books = this.books.filter(e => e.id !== id);
         },
        error: (err) => {
          console.error('error deleting employee', err);
        }
      }
    );

  }

  closeModal() {
    this.close.emit();
  }
  
}
