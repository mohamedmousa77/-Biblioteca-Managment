import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorModalComponent } from '../../components/modals/author-modal/author-form/author-modal.component';
import { ClientModalComponent } from '../../components/modals/client-modal/client-form/client-modal.component';
import { AuthorTableComponent } from '../../components/modals/author-modal/author-table/author-table.component';
import { ClientTableComponent } from '../../components/modals/client-modal/client-table/client-table.component';
@Component({
  selector: 'app-home',
  imports: [
    AuthorModalComponent,
    ClientModalComponent,
    CommonModule, 
    AuthorTableComponent,
    ClientTableComponent,
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
}
