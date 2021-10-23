import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
// import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Ride } from '../../../app/models/ride';


export default observer(function RideForm() {

    const history = useHistory();
    const { rideStore } = useStore();
    const { createRide, updateRide, loadRide } = rideStore;
    const { id } = useParams<{ id: string }>();

    const [ride, setRide] = useState<Ride>({
        id: '',
        beginAddress: '',
        destination: '',
        date: null,
        profile: null
    });

    const validationSchema = Yup.object({
        beginAddress: Yup.string().required('The beginAddress is required'),
        destination: Yup.string().required('The destination is required'),
        date: Yup.string().required('Date is required').nullable()
    });

    useEffect(() => {
        if (id) loadRide(id).then(ride => setRide(ride!))
    }, [id, loadRide]);

    function handleFormSubmit(ride: Ride) {
        if (ride.id.length === 0) {
            let newRide = {
                ...ride,
                id: uuid()
            }
            createRide(newRide).then(() => history.push(`/rides/${newRide.id}`))
        } else {
            updateRide(ride).then(() => history.push(`/rides/${ride.id}`))
        }

    }

    // if (loadingInititial) return <LoadingComponent content='loading activity...' />

    return (
        <Segment clearing>
            <Header content='Ride Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize initialValues={ride}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='beginAddress' placeholder='BeginAddress' />
                        <MyTextInput placeholder='Destination' name='destination' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Button
                            // disabled={isSubmitting || !dirty || !isValid}
                            disabled={ isSubmitting || !dirty || !isValid}
                            floated='right' positive
                            type='submit'
                            content='Submit'
                        />
                        <Button as={Link} to='rides' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});