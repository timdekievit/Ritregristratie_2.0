import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { NavLink } from 'react-router-dom';
import { Button, Grid, Loader, Segment } from 'semantic-ui-react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import RideFilters from './RideFilters';
import RideItemPlaceholder from './RideItemPlaceholder';
import RideList from './RideList';


export default observer(function RideDashboard() {
    const { rideStore } = useStore();
    const { loadRides, ridesRegistry, setPagingParams, pagination } = rideStore;
    const [loadingNext, setLoadingNext] = useState(false);
    var isEmpty = ridesRegistry.size === 0;

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadRides().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (ridesRegistry.size <= 1) loadRides();

    }, [ridesRegistry.size, loadRides])


    return (

        <Grid>
            {isEmpty && !rideStore.loadingInititial &&
                <Grid.Column width='16'>
                    <Segment>
                        <h1> You don't have any rides yet.</h1>
                        <Button as={NavLink} to='/CreateRide' positive content='Create Ride' />
                    </Segment>
                </Grid.Column>
            }
            <Grid.Column width='10'>

                {rideStore.loadingInititial && !loadingNext ? (
                    <>
                        <RideItemPlaceholder />
                        <RideItemPlaceholder />
                        <RideItemPlaceholder />
                        <RideItemPlaceholder />
                        <RideItemPlaceholder />
                    </>
                ) : <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination &&
                        pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <RideList />
                </InfiniteScroll>}
            </Grid.Column>
            {!isEmpty &&
                <>
                    <Grid.Column width='6'>
                        <RideFilters />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Loader active={loadingNext} />
                    </Grid.Column>
                </>}

        </Grid>
    )
});