 import React from 'react';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import { Button, Icon, Item,  Segment } from 'semantic-ui-react';
import { Ride } from '../../../app/models/ride';

interface Props {
    ride: Ride
}

export default function RideListItem({ride}: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/rides/${ride.id}`}>
                                <span> 
                                    <Icon name='road'></Icon> ride from {ride.beginAddress} to {ride.destination}
                                </span>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <span>
                    <Icon name='clock' /> {format(ride.date!, 'dd MMM yyyy')}
                    {/* <Icon name='marker'/> {ride.venue} */}
                </span>
                <Button
                    as={Link}
                    to={`/rides/${ride.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    );
}