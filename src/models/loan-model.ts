import { Author } from "./author-model";
import { Book } from "./book-model";
import { Client } from "./client-model";

export interface Loan {
    libroPrestato: Book,
    client: Client,
    author: Author,
    dataDiConsegna?: Date,
    dataDiScadenza: string,
    DataPrestito: string
}