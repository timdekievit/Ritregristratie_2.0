import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import RideDetailedHeader from './RideDetailedHeader';
import Map from '../../map/Map'

export default observer(function RideDetails(){
    const {rideStore} = useStore();
    const {selectedRide: ride, loadRide} = rideStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadRide(id);
    },[id, loadRide]);

    if (!ride) return <></>;

    return (
        <Grid>
            <Grid.Column width={16}>
                <RideDetailedHeader ride={ride!} />
                <Map ride={ride!} />
            </Grid.Column>
        </Grid>
    );
});