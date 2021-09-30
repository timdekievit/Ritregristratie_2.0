import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    RideRegistration
                </Menu.Item>
                <Menu.Item as={NavLink} to='/rides' name='Rides'/>
                <Menu.Item>
                    <Button as={NavLink} to='/CreateRide' positive content='Create Ride'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}