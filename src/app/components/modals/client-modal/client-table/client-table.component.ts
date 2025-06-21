import { Component,EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientService } from '../../../../services/client-services/client.service';
import { Client } from '../../../../../models/client-model';
@Component({
  selector: 'client-table',
  imports: [CommonModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent {
  @Output() close = new EventEmitter<void>();

  clients: Client[] = [];
  dataReady = false;

  constructor(private clientSer: ClientService) {}

  ngOnInit() {
  this.clientSer.getAllClients().subscribe((data: any[]) => {
    this.clients = data.map(d => ({
      // Mail
      mail: d.mail,
      persona: d.persona,
      socio: d.socio,
      telefono: d.telefono,
    }));
    this.dataReady = true;
    console.log("Dati caricati:", this.clientSer);
        this.clients.forEach((a, i) => {
      console.log(`Autore [${i}]`, a);
      console.log("Persona:", a.persona);
    });
  });
}


deleteClient(id: number)
{
  console.info(`ID inviato per l'eliminazione: ${id}`);
  this.clientSer.deleteClient(id).subscribe({
        next: (response) => {
          console.log(`Cliente eliminato!, ${response}`);
          this.clients = this.clients.filter(e => e.persona.id !== id);
        },
        error: (err) => {
          console.error('error deleting employee', err);
        }
      }
    );
}

editeClient(id:number, client: Client){

}
  closeModal() {
    this.close.emit();
  }

}
