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
    libroPrestato: {
      annoPubblicazione: new Date,
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
      casaEditrice: '',
      genere: '',
      isbn: 0,
      quantitaMagazzino: 0,
      titolo: '',
    },
    dataDiConsegna: new Date,
    dataDiScadenza: '',
    DataPrestito: '',
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
    this.getAllBooks();
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
  }

  getAllBooks(){
    this.bookService.getAllBooks().subscribe((data: Book[]) => {
      console.table("Books received are From this.bookService.getAllBooks: "+ data);
      this.books = data.map(
        d => ({
          id: d.id, 
          annoPubblicazione: d.annoPubblicazione,
          autore: d.autore,
          casaEditrice: d.casaEditrice,
          genere: d.genere,
          isbn: d.isbn,
          quantitaMagazzino: d.quantitaMagazzino,
          titolo: d.titolo,
        })
      )
      if (this.books.length > 0) {
        this.libroSelezionato = this.books[0];
      }
      console.log('Books data received:', data, "Books list contain: ");
      
  });
  }

  selectAuthor (author : Author) {
    console.log("Select author called! Author selected: "+ author.persona.nome);
    if (author != null ) {
      this.autoreSelezionato = author;
      this.LoanForm.patchValue({ autore: this.autoreSelezionato });
    }
  }

  selectClient (cliente : Client) {
    console.log("Select client called! Client selected: "+ cliente.persona.nome);
    if (cliente != null ) {
      this.clienteSelezionato = cliente;
      this.LoanForm.patchValue({ cliente: this.clienteSelezionato });
    }
  }

  selectBook(libro : Book) {
    console.log("Select book called! Book selected: "+ libro.titolo);
    if (libro != null ) {
      this.libroSelezionato = libro;
      this.LoanForm.patchValue({ libro: this.libroSelezionato });
    }
  }

  mapLoanForRequest(formData: any): any {
  return {
    autore: formData.autore,
    cliente: formData.cliente,
    libroPrestato: formData.libro,
    dataDiConsegna: null,
    dataDiScadenza: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    dataPrestito: new Date().toISOString()
  };
}

  submitForm() {
    console.log("Submit form called!");
    // console.table("data sent!"+ this.loan);

    if(this.LoanForm.valid){
      const formData = this.LoanForm.value;
      console.table("Form Data" + formData);
      // this.loan = { 
      //   author: formData.autore,
      //   client: formData.cliente,
      //   libroPrestato: formData.libro,
      //   dataDiConsegna: null as any,
      //   dataDiScadenza: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      //   DataPrestito: new Date().toISOString(),
      // }

      this.loanService.createNewLoan(this.mapLoanForRequest(formData)).subscribe(
        {
          next: () => {
            console.info("LOAN SAVED IN JSON");
            this.close.emit();
          },
          error: (error) => {
            console.error("❌ Error occurred during creating loan:", error, "The loan sent: ",this.loan);
          }
        }
      )
    }
  }

  closeModal() {
    this.close.emit();
  }
}
