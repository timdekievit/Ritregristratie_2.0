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

export enum TravelMode {
    BICYCLING = 'BICYCLING',
    DRIVING = 'DRIVING',
    TRANSIT = 'TRANSIT',
    WALKING = 'WALKING',
  }

export enum UnitSystem {
    IMPERIAL = 0.0,
    METRIC = 1.0,
  }  