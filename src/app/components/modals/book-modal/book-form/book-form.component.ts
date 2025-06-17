import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../../services/book-services/book.service';
import { Book } from '../../../../../models/book-model';
import { AuthorModalComponent } from '../../author-modal/author-form/author-modal.component';



@Component({
  selector: 'book-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {

   @Output() close = new EventEmitter<void>();

   bookForm: FormGroup;

  book: Book = {
    AnnoPubblicazione: new Date,
    CasaEditrice: '',
    Genere: '',
    ISBN: 0,
    QuantitaMagazzino: 0,
    Titolo: ''


  }

   constructor(private bookService: BookService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      titolo: ['', Validators.required],
      ISBN: ['', Validators.required],
      CasaEditrice: ['', Validators.required],
      AnnoPubblicazione: ['', Validators.required],
      Genere: ['', Validators.required],
      QuantitaMagazzino: ['', Validators.required]
    });
   }

   submitForm() {
    if (this.bookForm.valid) {
      console.log("✅ Author form data to send:", this.bookForm.value); 
      const formData = this.bookForm.value;
      
      this.book = {
        AnnoPubblicazione: formData.AnnoPubblicazione,
        CasaEditrice: formData.CasaEditrice,
        Genere: formData.Genere,
        ISBN: formData.ISBN,
        QuantitaMagazzino: formData.QuantitaMagazzino,
        Titolo: formData.titolo,
    };
    console.log("✅ Author form data to send:", formData); 
    console.log("✅ Payload to send:", this.book);


    //   this.bookService.createNewBook(this.book).subscribe({
    //   next: (result) => {
    //     console.log("✅ Autore salvato:", result);
    //     this.close.emit(); // chiudi popup
    //   },
    //   error: (err) => {
    //     console.error("❌ Error occurred during creating author:", err);
    //   }
    // });

  } else {
    console.warn("❌ Form is invalid!", this.bookForm);
  }
  }

  closeModal() {
    this.close.emit();
  }

}
