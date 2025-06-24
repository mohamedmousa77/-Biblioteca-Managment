import { Author } from "./author-model";
import { Book } from "./book-model";
import { Client } from "./client-model";

export interface Loan {
    id?: number,
    libroPrestato: Book,
    cliente: Client,
    autore: Author,
    dataDiConsegna?: Date,
    dataScadenza: string,
    dataPrestito: string
}