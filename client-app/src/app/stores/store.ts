 import { createContext, useContext } from "react"
import RideStore from "./rideStore"

interface Store {
    rideStore: RideStore;
}

export const store: Store = {
    rideStore: new RideStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}