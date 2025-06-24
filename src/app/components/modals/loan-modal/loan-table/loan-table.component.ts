import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../../../services/loan-services/loan.service';
import { Loan } from '../../../../../models/loan-model';

@Component({
  selector: 'loan-table',
  imports: [CommonModule],
  templateUrl: './loan-table.component.html',
  styleUrl: './loan-table.component.css'
})
export class LoanTableComponent {
  @Output() close = new EventEmitter<void>();

  loansList: Loan[] = [];
  isDataReady= false;

  constructor(private LS: LoanService) {  }

  ngOnInit(){

    this.LS.getAllLoans().subscribe((data: Loan[]  ) => {
      console.log(data);
      if (!data || !Array.isArray(data)) {
      console.warn("⚠️ Nessun dato caricato o risposta non valida.");
      this.loansList = [];
      return;
      }
      this.loansList = data.map(
        d=> ({
          autore: d.autore,
          cliente: d.cliente,
          libroPrestato: d.libroPrestato,
          dataPrestito: d.dataPrestito,
          dataScadenza:d.dataScadenza,
          id: d.id,
        })
      );
      this.isDataReady = true;
      console.log("Dati caricati:", this.loansList);
    //     this.loansList.forEach((a, i) => {
    //   console.log(`Loans [${i}]`, a);
    // });
    })
    
  }

  RegistraConsegna(id: number)
  {
    // this.LS.deleteLoan(id).subscribe({
    //       next: () => {
    //         // this.loansList = this.loansList.filter(e => e.id !== id);
            
    //       },
    //       error: (err) => {
    //         console.error('error deleting employee', err);
    //       }
    //     }
    //   );
  }

  closeModal() {
      this.close.emit();
    }  
}
