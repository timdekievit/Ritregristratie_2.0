import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment} from 'semantic-ui-react'
import { Ride } from '../../../app/models/ride';

// const activityImageStyle = {
//     filter: 'brightness(30%)'
// };

// const activityImageTextStyle = {
//     position: 'absolute',
//     bottom: '5%',
//     left: '5%',
//     width: '100%',
//     height: 'auto',
//     color: 'white'
// };

interface Props {
    ride: Ride
}

export default observer (function RideDetailedHeader({ride}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {/* <Image src={`/assets/categoryImages/${ride.category}.jpg`} fluid style={activityImageStyle}/> */}
                <Segment basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={ride.id}
                                    style={{color: 'white'}}
                                />
                                <p>{format(ride.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${ride.id}`} color='orange' floated='right'>
                    Edit Ride
                </Button>
            </Segment>
        </Segment.Group>
    )
})