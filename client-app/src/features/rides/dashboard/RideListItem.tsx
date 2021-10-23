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
                                ride from {ride.beginAddress} to {ride.destination}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(ride.date!, 'dd MMM yyyy h:mm aa')}
                    {/* <Icon name='marker'/> {ride.venue} */}
                </span>
            </Segment>
            <Segment clearing>
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