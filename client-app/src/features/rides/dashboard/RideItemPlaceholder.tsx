import React, { Fragment } from 'react';
import { Segment, Button, Placeholder } from 'semantic-ui-react';

export default function RideItemPlaceholder() {
    return (
        <Fragment>
            <Placeholder fluid style={{ marginTop: 15 }}>
                <Segment.Group>
                    <Segment style={{ minHeight: 50 }}>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line />
                            </Placeholder.Header>
                        </Placeholder>
                    </Segment>
                    <Segment clearing>
                        <Button disabled color='blue' floated='right' content='View' />
                    </Segment>
                </Segment.Group>
            </Placeholder>
        </Fragment>
    );
};