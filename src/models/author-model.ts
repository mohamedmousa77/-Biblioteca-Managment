import { Persona } from "./persona-model";

export interface Author {
    persona: Persona;
    casaEditrice: string;
    indiceDiGradimento: number;
}