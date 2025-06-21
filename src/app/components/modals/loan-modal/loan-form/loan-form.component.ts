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
    persona: 
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

  constructor(private fb: FormBuilder, private bookService: BookService, private authorServices: AuthorService, private clientService: ClientService, private loanService: LoanService) {
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

  loadData() 
  {
    console.log('Load data called');

    this.authorServices.getAllAuthors().subscribe((data: Author[]) => {
    this.authors = data
    .map(d => ({
      casaEditrice: d.casaEditrice,
      indiceDiGradimento: d.indiceDiGradimento,
      persona:  
        {
          id: d.persona.id,
          nome: d.persona.nome,
          cognome: d.persona.cognome
        }
      }) 
    );
      if (this.authors.length > 0) {
        this.autoreSelezionato = this.authors[0]; 
      }
    });

    this.clientService.getAllClients().subscribe((data: Client[]) => {
      this.clients = data
      .map(d => ({
        telefono: d.telefono,
        mail: d.mail,
        socio: d.socio,
        persona:  
          {
            id: d.persona.id,
            nome: d.persona.nome,
            cognome: d.persona.cognome
          }
        })
      )
      if (this.clients.length > 0) {
        this.clienteSelezionato = this.clients[0]; 
      }
    });

    this.bookService.getAllBooks().subscribe((data: Book[]) => {
      this.books = data.map(
        d => ({
          id: d.id, 
          AnnoPubblicazione: d.AnnoPubblicazione,
          autore: d.autore,
          CasaEditrice: d.CasaEditrice,
          Genere: d.Genere,
          ISBN: d.ISBN,
          QuantitaMagazzino: d.QuantitaMagazzino,
          Titolo: d.Titolo,
        })
      )
      if (this.books.length > 0) {
        this.libroSelezionato = this.books[0];
      }
      console.log('Books data received:', data);
  });

    // this.authorLoaded = true;
    this.autoreSelezionato = this.authors[0];
    this.clienteSelezionato = this.clients[0];
    // this.libroSelezionato = this.books[0];

  // console.log("autori caricati:");
  // console.table(this.authors);
  // console.log("clienti caricati:");
  // console.table(this.clients);
  // console.log("libri caricati:");
  // console.table(this.books);
  }

  selectAuthor (author : Author) {
    console.log("Select author called! ");
    if (author != null ) {
      this.autoreSelezionato = author;
      this.LoanForm.patchValue({ autore: this.autoreSelezionato });
    }
  }
  selectClient (cliente : Client) {
    console.log("Select author called! ");
    if (cliente != null ) {
      this.clienteSelezionato = cliente;
      this.LoanForm.patchValue({ cliente: this.clienteSelezionato });
    }
  }
  selectBook(libro : Book) {
    console.log("Select author called! ");
    if (libro != null ) {
      this.libroSelezionato = libro;
      this.LoanForm.patchValue({ libro: this.libroSelezionato });
    }
  }

  submitForm() {
    if(this.LoanForm.valid){
      const formData = this.LoanForm.value;
      console.table("Form Data" + formData);
      this.loan = { 
        author: formData.autore,
        client: formData.cliente,
        book: formData.libro,
        dataDiConsegna: null as any,
        dataDiScadenza: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        DataPrestito: new Date(Date.now()),
      }

      this.loanService.createNewLoan(this.loan).subscribe(
        {
          next: () => {
            console.info("LOAN SAVED IN JSON");
            this.close.emit();
          },
          error: (error) => {
            console.error("❌ Error occurred during creating loan:", error);
          }
        }
      )
    }
  }

  closeModal() {
    this.close.emit();
  }
}
