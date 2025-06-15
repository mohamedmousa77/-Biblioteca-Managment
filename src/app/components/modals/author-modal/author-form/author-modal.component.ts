import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthorService } from '../../../../services/author-services/author.service';
import { Author } from '../../../../../models/author-model';


@Component({
  selector: 'author-modal',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './author-modal.component.html',
  styleUrl: './author-modal.component.css'
})

export class AuthorModalComponent {

  @Output() close = new EventEmitter<void>();

  authorForm: FormGroup;
  errorMsg: string = '';

  author : Author = {
      Persona : {
        Id: 0,
        Nome: '',
        Cognome: '',
      },
      CasaEditrice: '',
      IndiceDiGradimento:0,
      }; 

  constructor(private fb: FormBuilder, private authorServices: AuthorService) {
    this.authorForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      indiceDiGradimento: ['', Validators.required],
      casaEditrice: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.authorForm.valid) {
      console.log("✅ Author form data to send:", this.authorForm.value); 
      const formData = this.authorForm.value;
      
      this.author = {
      Persona: {
        Id: 0,
        Nome: formData.nome,
        Cognome: formData.cognome
      },
      CasaEditrice: formData.casaEditrice,
      IndiceDiGradimento: formData.indiceDiGradimento
    };
    console.log("✅ Author form data to send:", formData); 
    console.log("✅ Payload to send:", this.author);


      this.authorServices.createNewAuthor(this.author).subscribe({
      next: (result) => {
        console.log("✅ Autore salvato:", result);
        this.close.emit(); // chiudi popup
      },
      error: (err) => {
        console.error("❌ Error occurred during creating author:", err);
      }
    });

  } else {
    console.warn("❌ Form is invalid!", this.authorForm);
  }
  }

  closeModal() {
    this.close.emit();
  }
}
