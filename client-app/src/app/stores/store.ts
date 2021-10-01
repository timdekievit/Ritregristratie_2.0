 import { createContext, useContext } from "react"
import CommonStore from "./commonStore";
import RideStore from "./rideStore"

interface Store {
    rideStore: RideStore;
    commonStore: CommonStore;
}

export const store: Store = {
    rideStore: new RideStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}