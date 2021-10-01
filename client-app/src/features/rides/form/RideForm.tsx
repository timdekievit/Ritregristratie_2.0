import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';


export default observer(function RideForm() {

    const history = useHistory();
    const { rideStore } = useStore();
    const { createRide, updateRide, loadRide } = rideStore;
    const { id } = useParams<{ id: string }>();

    const [ride, setRide] = useState({
        id: '',
        beginAddress: '',
        destination: '',
        date: '',
    });

    useEffect(() => {
        if (id) loadRide(id).then(ride => setRide(ride!))
    }, [id, ride]);

    // function handleSubmit() {
    //     if (ride.id.length === 0) {
    //         let newRide = {
    //             ...ride,
    //             id: uuid()
    //         }
    //         createRide(newRide).then(() => history.push(`/rides/${newRide.id}`))
    //     } else {
    //         updateRide(ride).then(() => history.push(`/rides/${ride.id}`))
    //     }

    // }

    // function handleChange(event: ChangeEvent<HTMLInputElement>) {
    //     const { name, value } = event.target;
    //     setRide({ ...ride, [name]: value });
    // }

    // if (loadingInititial) return <LoadingComponent content='loading activity...'/>

    return (
        <Segment clearing>
            <Formik initialValues={ride} onSubmit={values => console.log(values)}>
                {({ values: ride, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Form.Input placeholder='beginAddress' value={ride.beginAddress} name='title' onChange={handleChange} />
                        <Form.Input placeholder='destination' value={ride.destination} name='description' onChange={handleChange} />
                        <Form.Input type='date' placeholder='Date' value={ride.date} name='date' onChange={handleChange} />
                        <Button floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='rides' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});