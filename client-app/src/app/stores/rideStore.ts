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

    // get activitiesByDate() {
    //     return Array.from(this.activitiesRegistry.values()).sort((a, b) => 
    //     Date.parse(a.date) - Date.parse(b.date));
    // }

    // loadRides = async () => {
    //     this.loadingInititial = true;
    //     try {
    //         const rides = await agent.Rides.list();
    //         rides.forEach(activity => {
    //             this.setActivity(activity);
    //         });
    //         this.setLoadingInitial(false);
    //     } catch (error) {
    //         console.log(error);
    //         this.setLoadingInitial(false);
    //     }
    // }

    // loadActivity = async (id: string) => {
    //     let activity = this.getActivity(id);
    //     if (activity) {
    //         this.selectedActivity = activity;
    //         return activity;
    //     } else {
    //         this.loadingInititial = true;
    //         try {
    //             activity = await agent.Activities.details(id);
    //             this.setActivity(activity);
    //             runInAction(() => {
    //                 this.selectedActivity = activity;
    //             })
    //             this.setLoadingInitial(false);
    //             return activity;
    //         } catch (error) {
    //             console.log(error);
    //             this.setLoadingInitial(false);
    //         }
    //     }
    // }

    // private setActivity = (activity: Activity) => {
    //     activity.date = activity.date.split('T')[0];
    //     this.activitiesRegistry.set(activity.id, activity);
    // }

    // private getActivity = (id: string) => {
    //     return this.activitiesRegistry.get(id);
    // }

    // setLoadingInitial = (state: boolean) => {
    //     this.loadingInititial = state;
    // }

    // createActivity = async (activity: Activity) => {
    //     this.loading = true;
    //     try {
    //         await agent.Activities.create(activity);
    //         runInAction(() => {
    //             this.activitiesRegistry.set(activity.id, activity);
    //             this.selectedActivity = activity;
    //             this.editMode = false;
    //             this.loading = false;
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => {
    //             this.loading = false;
    //         })
    //     }
    // }

    // updateActivity = async (activity: Activity) => {
    //     this.loading = true;
    //     try {
    //         await agent.Activities.update(activity);
    //         runInAction(() => {
    //             this.activitiesRegistry.set(activity.id, activity);
    //             this.selectedActivity = activity;
    //             this.editMode = false;
    //         })
    //     } catch (error) {
    //         runInAction(() => {
    //             this.loading = false;
    //         });
    //     }
    // }

    // deleteActivity = async (id: string) => {
    //     this.loading = true;
    //     try {
    //         await agent.Activities.delete(id);
    //         runInAction(() => {
    //             this.activitiesRegistry.delete(id);
    //             this.loading = false;
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => {
    //             this.loading = false;
    //         })
    //     }
    // }

}