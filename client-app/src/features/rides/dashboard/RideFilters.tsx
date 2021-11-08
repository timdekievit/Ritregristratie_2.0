import { observer } from 'mobx-react-lite';
import React from 'react'
import { Menu, Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function RideFilters() {
    const {rideStore: {setPredicate, orderByRecent}} = useStore();
    return (
        <>
            <Menu vertical size='large' style={{ widht: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item 
                    content='recent rides first'
                    active={orderByRecent === true}
                    onClick={() => {
                        setPredicate('orderByRecent')
                    }} 
                />
                <Menu.Item 
                    content="oldest rides first"
                    active={orderByRecent === false}
                    onClick={() => setPredicate('orderByOld')}  
                />
            </Menu>
            <Header />
            {/* <Calendar 
                onChange={(date: any) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            /> */}
        </>
    )
})