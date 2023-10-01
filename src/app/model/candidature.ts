import {User} from "./user";


export interface Candidature {
    id: number;
    poste: string;
    dateSoumission: Date;
    etat: string;
    cv: string;
    userId: User;
}
