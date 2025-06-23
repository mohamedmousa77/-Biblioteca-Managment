import { Author } from "./author-model";

export interface Book {
    id?: number,
    autore: Author,
    isbn: number,
    titolo: string,
    quantitaMagazzino: number,
    genere: string,
    annoPubblicazione: Date,
    casaEditrice: string,
}