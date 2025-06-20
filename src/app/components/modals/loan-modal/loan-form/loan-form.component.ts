import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../../../services/loan-services/loan.service';
import { AuthorService } from '../../../../services/author-services/author.service';
import { ClientService } from '../../../../services/client-services/client.service';
import { groupBy } from 'rxjs';
import { Loan } from '../../../../../models/loan-model';
import { Client } from '../../../../../models/client-model';
import { Author } from '../../../../../models/author-model';
import { Book } from '../../../../../models/book-model';
import { BookService } from '../../../../services/book-services/book.service';

// import { Component,EventEmitter, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'loan-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.css'
})
export class LoanFormComponent {

  @Output() close = new EventEmitter<void>();

  LoanForm: FormGroup;
   authors: Author [] = [];
   autoreSelezionato? :Author;

   clients: Client [] = [];
   clienteSelezionato? : Client;

   books: Book[] = [];
   libroSelezionato?: Book;


  loan: Loan = {
    author: 
    {
    persona: 
    {
      id: 0,
      nome: '',
      cognome: ''
    },
    casaEditrice: '',
    indiceDiGradimento: 0
    },
    client: {
    Persona: 
    {
      id: 0,
      nome: '',
      cognome: ''
    },
    mail: '',
    socio: false,
    telefono: '',
    },
    book: {
      AnnoPubblicazione: new Date,
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
      },
      CasaEditrice: '',
      Genere: '',
      ISBN: 0,
      QuantitaMagazzino: 0,
      Titolo: '',
    },
    dataDiConsegna: new Date,
    dataDiScadenza: new Date,
    DataPrestito: new Date,
  }

  constructor(private fb: FormBuilder, private bookService: BookService, private authorServices: AuthorService, private clientService: ClientService) {
    this.LoanForm = this.fb.group({
      autore: ['', Validators.required],
      cliente: ['', Validators.required],
      libro: ['', Validators.required],
      dataPrestito: [Date, Validators.required ],
      dataScadenza: [Date, Validators.required]
    });
  }

  ngOnInit() {
    this.loadData();
   }

    loadData() {
    console.log('Load data called')
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

    this.clientService.getAllClients().subscribe((data: any[]) => {
      this.clients = data.map(d => ({
        telefono: d.telefono,
        mail: d.mail,
        socio: d.socio,
        Persona:  
          {
            id: d.Persona.id,
            nome: d.Persona.nome,
            cognome: d.Persona.cognome
          }
      })
     )
    });

    this.bookService.getAllBooks().subscribe((data: any[]) => {
      this.books = data.map(d => ({
        AnnoPubblicazione: d.AnnoPubblicazione,
        autore: d.autore,
        CasaEditrice: d.casaEditrice,
        Genere: d.Genere,
        ISBN: d.isbn,
        QuantitaMagazzino: d.QuantitaMagazzino,
        Titolo: d.titolo,
      }))
    })
    // this.authorLoaded = true;
    this.autoreSelezionato = this.authors[0];
    this.clienteSelezionato = this.clients[0];
    this.libroSelezionato = this.books[0];



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
      this.LoanForm.patchValue({ autore: this.autoreSelezionato });
    }
   }
  selectClient (client : Client) {
    console.log("Select author called! ");
    if (client != null ) {
      this.clienteSelezionato = client;
      this.LoanForm.patchValue({ client: this.clienteSelezionato });
    }
   }
  selectLoan(libro : Book) {
    console.log("Select author called! ");
    if (libro != null ) {
      this.libroSelezionato = libro;
      this.LoanForm.patchValue({ libro: this.libroSelezionato });
    }
   }

  submitForm() {

  }


  closeModal() {
    this.close.emit();
  }
}
