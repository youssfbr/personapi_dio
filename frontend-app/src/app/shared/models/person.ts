import { Phone } from "./phone";

export interface Person {

  id: number;
  firstName: string;
  lastName: string;
  cpf: string;
  birthDate: String;
  registerDate: string
  phones: Phone[];

}
