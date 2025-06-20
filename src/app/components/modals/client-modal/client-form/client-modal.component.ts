import { Component,EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Client } from '../../../../../models/client-model';
import { ClientService } from '../../../../services/client-services/client.service';

@Component({
  selector: 'client-modal',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.css'
})
export class ClientModalComponent {

  @Output() close = new EventEmitter<void>();

  clientForm: FormGroup;

  client: Client = {
    Persona: {
      cognome: '',
      // id: 0,
      nome: ''
    },
    mail: '',
    telefono: '',
    socio: false,
  }

  constructor(private fb: FormBuilder, private clientServices: ClientService) {

    this.clientForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
  }

    submitForm() {
    if (this.clientForm.valid) {
      var formData = this.clientForm.value;

      this.client = {
      Persona: {
        // id: 0,
        nome: formData.nome,
        cognome: formData.cognome
      },
      socio: false,
      mail: formData.email,
      telefono: formData.telefono
    };
    console.log("✅ Author form data to send:", formData); 
    console.log("✅ Payload to send:", this.client);

      this.clientServices.createNewClient(this.client).subscribe({
      next: (result) => {
        console.log("✅ Autore salvato:", result);
        this.close.emit(); // chiudi popup
      },
      error: (err) => {
        console.error("❌ Error occurred during creating author:", err);
      }
    });
  } 
  else {
    console.warn("❌ Form is invalid!", this.clientForm);
  }
    
  }

  closeModal() {
    this.close.emit();
  }

}
