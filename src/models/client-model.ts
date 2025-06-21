import { Persona } from "./persona-model"

export interface Client {
    persona: Persona,
    mail: string,
    telefono: string,
    socio:boolean
}