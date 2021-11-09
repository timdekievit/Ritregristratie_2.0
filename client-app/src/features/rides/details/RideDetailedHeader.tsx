/* eslint-disable no-undef */
import { DistanceMatrixService, LoadScript } from '@react-google-maps/api';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment } from 'semantic-ui-react'
import { Ride, TravelMode, UnitSystem } from '../../../app/models/ride';
import { useStore } from '../../../app/stores/store';

interface Props {
    ride: Ride
}



export default observer(function RideDetailedHeader({ ride }: Props) {
    let [distance, setDistance] = useState<any>();
    const {rideStore} = useStore();

    const distanceCallback = (response: any) => {
        var km = response.rows[0].elements[0].distance.value / 1000
        setDistance(km);
    }

    return (
        <>
            <LoadScript
                googleMapsApiKey={rideStore.apiKey}
            >
                {distance === undefined &&
                (<DistanceMatrixService
                    options={{
                        origins: [ride.beginAddress],
                        destinations: [ride.destination],
                        travelMode: TravelMode.DRIVING,
                        unitSystem: UnitSystem.METRIC
                    }}
                    callback={distanceCallback}
                />)}
            </LoadScript>
            <Segment.Group>
                <Segment clearing>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={`ride from ${ride.beginAddress} to ${ride.destination}`}
                                />
                                <p>{format(ride.date!, 'dd MMM yyyy h:mm aa')}</p>
                                <p>
                                    ride by <strong>{ride.profile?.displayName}</strong>
                                </p>

                                {distance !== undefined && (
                                    <p>distance: {distance} km</p>
                                )}

                            </Item.Content>
                        </Item>
                    </Item.Group>
                    <Button as={Link} to={`/manage/${ride.id}`} color='orange' floated='right'>
                        Edit Ride
                    </Button>
                </Segment>
            </Segment.Group>
        </>
    )
})