import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorModalComponent } from '../../components/modals/author-modal/author-form/author-modal.component';
import { ClientModalComponent } from '../../components/modals/client-modal/client-form/client-modal.component';
import { AuthorTableComponent } from '../../components/modals/author-modal/author-table/author-table.component';
import { ClientTableComponent } from '../../components/modals/client-modal/client-table/client-table.component';
import { BookFormComponent } from '../../components/modals/book-modal/book-form/book-form.component';
import { LoanFormComponent } from '../../components/modals/loan-modal/loan-form/loan-form.component';
@Component({
  selector: 'app-home',
  imports: [
    AuthorModalComponent,
    ClientModalComponent,
    CommonModule, 
    AuthorTableComponent,
    ClientTableComponent,
    BookFormComponent,
    LoanFormComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showAuthorForm = false;
  showClientForm = false;

  showAuthorTable = false;
  showClientTable = false;

  showBookForm = false;

  showLoanForm = false;
}
