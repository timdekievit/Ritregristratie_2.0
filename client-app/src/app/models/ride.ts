import { User } from "./user";

export interface Ride {
    id: string;
    beginAddress: string;
    destination: string;
    date: Date | null;
    user: User | null;
}