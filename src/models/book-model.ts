import { Author } from "./author-model";

export interface Book {
    id?: number,
    Author?: Author,
    ISBN: number,
    Titolo: string,
    QuantitaMagazzino: number,
    Genere: string,
    AnnoPubblicazione: Date,
    CasaEditrice: string,
}