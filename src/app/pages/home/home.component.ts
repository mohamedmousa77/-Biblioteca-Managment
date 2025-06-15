import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorModalComponent } from '../../components/modals/author-modal/author-form/author-modal.component';
import { ClientModalComponent } from '../../components/modals/client-modal/client-form/client-modal.component';

@Component({
  selector: 'app-home',
  imports: [AuthorModalComponent,ClientModalComponent ,CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showAuthorModal = false;
  showClientModal = false;
}
