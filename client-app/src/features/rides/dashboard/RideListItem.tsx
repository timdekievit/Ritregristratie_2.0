 import React from 'react';
import { Link } from 'react-router-dom';
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
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/rides/${ride.id}`}>
                                {ride.id}
                            </Item.Header>
                            <Item.Description>Ride by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {ride.date}
                    {/* <Icon name='marker'/> {ride.venue} */}
                </span>
            </Segment>
            <Segment clearing>
                <span>{ride.beginAddress}</span>
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