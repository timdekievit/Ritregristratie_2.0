import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown, Icon } from 'semantic-ui-react'
import { useStore } from '../stores/store';

export default function NavBar() {

    const { userStore: { user, logout } } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    {/* <img src="assets/logo.png" alt="logo" style={{marginRight: '10px'}}/> */}
                    <Icon name='car' size='big'/>
                    RideRegistration
                </Menu.Item>
                <Menu.Item as={NavLink} to='/rides' name='Rides'/>
                <Menu.Item>
                    <Button as={NavLink} to='/CreateRide' positive content='Create Ride'/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}