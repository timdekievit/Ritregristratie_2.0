import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
// import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ActivityFilters from './ActivityFilters';
// import ActivityList from './ActivityList';


export default observer(function RideDashboard() {
    const { rideStore } = useStore();
    // const {loadActivities, activitiesRegistry} = rideStore;

    // useEffect(() => {
    //     if (activitiesRegistry.size <= 1) loadActivities();
    // }, [activitiesRegistry.size, loadActivities])
  
    // if (activityStore.loadingInititial) return <LoadingComponent content='Loading app' />

    return (
        // <Grid>
        //     <Grid.Column width='10'>
        //         <ActivityList />
        //     </Grid.Column>
        //     <Grid.Column width='6'>
        //         <ActivityFilters />
        //     </Grid.Column>
        // </Grid>
        <h1>DashBoard</h1>
    )
});