/* eslint-disable no-undef */
import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { Ride } from "../models/ride";

export default class RideStore {
    ridesRegistry = new Map<string, Ride>();
    selectedRide: Ride | undefined = undefined;
    apiKey: string = '';
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    // editMode = false;
    // loading = false;
    // loadingInititial = true;

    constructor() {
        makeAutoObservable(this)
        this.loadApiKey();
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        return params;
    }

    get ridesByDate() {
        return Array.from(this.ridesRegistry.values()).sort((a, b) => 
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedRides() {
        return Object.entries(
            this.ridesByDate.reduce((rides, ride) => {
                const date = format(ride.date!, 'dd MMM yyyy')
                rides[date] = rides[date] ? [...rides[date], ride] : [ride];
                return rides;
            }, {} as {[key: string]: Ride[]})
        )
    }

    loadApiKey = async () => {
        try {
            this.apiKey = await agent.GoogleMaps.apiKey();
        } catch (error) {
            console.log(error);
        }
    }

    loadRides = async () => {
        // this.loadingInititial = true;
        try {
            const result = await agent.Rides.list(this.axiosParams);
            result.data.forEach(ride => {
                this.setRide(ride);
            });
            this.setPagination(result.pagination)
            // this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            // this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
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

    getDistance = async (ride: Ride) => {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [ride.beginAddress],
            destinations: [ride.destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC
        });
        console.log(service);
    }

    private setRide= (ride: Ride) => {
        ride.date = new Date(ride.date!)
        this.ridesRegistry.set(ride.id, ride);
    }

    private getRide = (id: string) => {
        return this.ridesRegistry.get(id);
    }

    // setLoadingInitial = (state: boolean) => {
    //     this.loadingInititial = state;
    // }

    createRide = async (ride: Ride) => {
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