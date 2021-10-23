import { User } from "./user";

export interface Ride {
    id: string;
    beginAddress: string;
    destination: string;
    date: Date | null;
    profile: Profile | null;
}

export interface Profile {
    userName: string;
    displayName: string
}