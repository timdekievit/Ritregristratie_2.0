 import { createContext, useContext } from "react"
import CommonStore from "./commonStore";
import RideStore from "./rideStore"
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    rideStore: RideStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    rideStore: new RideStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}