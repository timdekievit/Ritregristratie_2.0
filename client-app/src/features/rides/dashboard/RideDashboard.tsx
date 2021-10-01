import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import RideFilters from './RideFilters';
import RideList from './RideList';
// import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer(function RideDashboard() {
    const { rideStore } = useStore();
    const {loadRides, ridesRegistry} = rideStore;

    useEffect(() => {
        if (ridesRegistry.size <= 1) loadRides();
    }, [ridesRegistry.size, loadRides])
  
    // if (activityStore.loadingInititial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <RideList />
            </Grid.Column>
            <Grid.Column width='6'>
                <RideFilters />
            </Grid.Column>
        </Grid>
    )
});