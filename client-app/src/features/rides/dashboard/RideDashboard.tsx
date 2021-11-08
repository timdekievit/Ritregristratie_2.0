import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Loader } from 'semantic-ui-react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import RideFilters from './RideFilters';
import RideList from './RideList';
// import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer(function RideDashboard() {
    const { rideStore } = useStore();
    const {loadRides, ridesRegistry, setPagingParams, pagination} = rideStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadRides().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (ridesRegistry.size <= 1) loadRides();
    }, [ridesRegistry.size, loadRides])
  
    // if (activityStore.loadingInititial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination &&
                            pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <RideList />
                </InfiniteScroll>
            </Grid.Column>
            <Grid.Column width='6'>
                <RideFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
});