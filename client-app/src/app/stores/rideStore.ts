import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Ride } from "../models/ride";

export default class RideStore {
    ridesRegistry = new Map<string, Ride>();
    selectedRide: Ride | undefined = undefined;
    // editMode = false;
    // loading = false;
    // loadingInititial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get ridesByDate() {
        return Array.from(this.ridesRegistry.values()).sort((a, b) => 
        Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedRides() {
        return Object.entries(
            this.ridesByDate.reduce((rides, ride) => {
                const date = ride.date;
                rides[date] = rides[date] ? [...rides[date], ride] : [ride];
                return rides;
            }, {} as {[key: string]: Ride[]})
        )
    }


    loadRides = async () => {
        // this.loadingInititial = true;
        try {
            const rides = await agent.Rides.list();
            rides.forEach(ride => {
                this.setRide(ride);
            });
            // this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            // this.setLoadingInitial(false);
        }
    }

    loadRide = async (id: string) => {
        let ride = this.getRide(id);
        if (ride) {
            this.selectedRide = ride;
            return ride;
        } else {
            // this.loadingInititial = true;
            try {
                ride = await agent.Rides.details(id);
                this.setRide(ride);
                runInAction(() => {
                    this.selectedRide= ride;
                })
                return ride;
            } catch (error) {
                console.log(error);
                // this.setLoadingInitial(false);
            }
        }
    }

    private setRide= (ride: Ride) => {
        ride.date = ride.date.split('T')[0];
        this.ridesRegistry.set(ride.id, ride);
    }

    private getRide = (id: string) => {
        return this.ridesRegistry.get(id);
    }

    // setLoadingInitial = (state: boolean) => {
    //     this.loadingInititial = state;
    // }

    createRide= async (ride: Ride) => {
        // this.loading = true;
        try {
            await agent.Rides.create(ride);
            runInAction(() => {
                this.ridesRegistry.set(ride.id, ride);
                this.selectedRide = ride;
                // this.editMode = false;
                // this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                // this.loading = false;
            })
        }
    }

    updateRide = async (ride: Ride) => {
        // this.loading = true;
        try {
            await agent.Rides.update(ride);
            runInAction(() => {
                this.ridesRegistry.set(ride.id, ride);
                this.selectedRide = ride;
                // this.editMode = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                // this.loading = false;
            });
        }
    }

    deleteActivity = async (id: string) => {
        // this.loading = true;
        try {
            await agent.Rides.delete(id);
            runInAction(() => {
                this.ridesRegistry.delete(id);
                // this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                // this.loading = false;
            })
        }
    }

}