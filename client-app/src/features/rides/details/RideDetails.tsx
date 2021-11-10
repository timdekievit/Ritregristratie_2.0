import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import RideDetailedHeader from './RideDetailedHeader';
import Map from '../../map/Map'
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function RideDetails(){
    const {rideStore} = useStore();
    const {selectedRide: ride, loadRide, loadingInititial, clearSelectedRide} = rideStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadRide(id);
        return () => clearSelectedRide();
    },[id, loadRide, clearSelectedRide]);

    if (loadingInititial || !ride) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={16}>
                <RideDetailedHeader ride={ride!} />
                <Map ride={ride!} />
            </Grid.Column>
        </Grid>
    );
});