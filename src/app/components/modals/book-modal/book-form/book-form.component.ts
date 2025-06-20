import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../../services/book-services/book.service';
import { Book } from '../../../../../models/book-model';
import { AuthorModalComponent } from '../../author-modal/author-form/author-modal.component';
import { Author } from '../../../../../models/author-model';
import { AuthorService } from '../../../../services/author-services/author.service';


@Component({
  selector: 'book-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {

   @Output() close = new EventEmitter<void>();

   bookForm: FormGroup;

   authors: Author [] = [];
   autoreSelezionato? :Author;

   authorLoaded: boolean = false;

  book: Book = {
    AnnoPubblicazione: new Date,
    CasaEditrice: '',
    Genere: '',
    ISBN: 0,
    QuantitaMagazzino: 0,
    Titolo: '',
    autore: 
    {
    persona: 
    {
      id: 0,
      nome: '',
      cognome: ''
    },
    casaEditrice: '',
    indiceDiGradimento: 0
    }
  }

   constructor(private bookService: BookService, private fb: FormBuilder, private authorServices: AuthorService) {
    this.bookForm = this.fb.group({
      titolo: ['', Validators.required],
      ISBN: ['', Validators.required],
      CasaEditrice: ['', Validators.required],
      AnnoPubblicazione: ['', Validators.required],
      Genere: ['', Validators.required],
      QuantitaMagazzino: ['', Validators.required],
      autore: ['', Validators.required]
    });
   }

   ngOnInit() {
    this.loadAuthors(); 
   }

   loadAuthors() {
    console.log('Load author called')
    this.authorServices.getAllAuthors().subscribe((data: any[]) => {
    this.authors = data.map(d => ({
      casaEditrice: d.casaEditrice,
      indiceDiGradimento: d.indiceDiGradimento,
      persona:  
      {
        id: d.persona.id,
        nome: d.persona.nome,
        cognome: d.persona.cognome
      }

    }));

    this.authorLoaded = true;
    this.autoreSelezionato = this.authors[0];
    console.log("Dati caricati:", this.authors);
        this.authors.forEach((a, i) => {
      console.log(`Autore [${i}]`, a);
      console.log("Persona:", a.persona);
        });
    });
   }

   selectAuthor (author : Author) {
    console.log("Select author called! ");
    if (author != null ) {
      this.autoreSelezionato = author;
      this.bookForm.patchValue({ autore: this.autoreSelezionato });
    }
   }

   submitForm() {
    if (this.bookForm.valid) {
      console.log("✅ Book form data to send:", this.bookForm.value); 
      const formData = this.bookForm.value;
      
      this.book = {
        AnnoPubblicazione: formData.AnnoPubblicazione,
        CasaEditrice: formData.CasaEditrice,
        Genere: formData.Genere,
        ISBN: formData.ISBN,
        QuantitaMagazzino: Number(formData.QuantitaMagazzino),
        Titolo: formData.titolo,
        autore: formData.autore, 
      };
    console.log("✅ Book form data to send:", formData); 
    // console.log("✅ Payload to send:", this.book);

    console.log("📦 JSON to send:", JSON.stringify(this.book, null, 2));
      this.bookService.createNewBook(this.book).subscribe({
      next: (result) => {
        console.log("✅ libro salvato:", result);
        this.close.emit(); // chiudi popup
      },
      error: (err) => {
        console.error("❌ Error occurred during creating book:", err);
      }
    });

  } else {
    console.warn("❌ Form is invalid!", this.bookForm);
  }
  }

  closeModal() {
    this.close.emit();
  }

}
