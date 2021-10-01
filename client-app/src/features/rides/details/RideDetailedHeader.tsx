import { observer } from 'mobx-react-lite';
import React from 'react'
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
                                <p>{ride.date}</p>
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
                <Button color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})