import React, { useState } from 'react'
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { Ride } from '../../app/models/ride';

const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lat: 52.23,
  lng: 4.55
};

interface Props {
  ride: Ride
}

enum TravelMode {
  BICYCLING = 'BICYCLING',
  DRIVING = 'DRIVING',
  TRANSIT = 'TRANSIT',
  WALKING = 'WALKING',
}

export default function Map({ ride }: Props) {
  let [directions, setDirections] = useState();

  // useEffect(() => {
  //   console.log('use effect ran')
  //   console.log(directions)
  // }, [directions])

  const directionsCallback = (response: any) => {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK' && directions === undefined) {
        
        console.log(response)
        setDirections(response);
      } else {
        console.log('response: ', response)
      }
    }
  }


  return (
    <LoadScript
      googleMapsApiKey="AIzaSyC_jIcYW6IfhEjwVzxAGOb14-hYl0aVu3s"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >

        {
          ride.destination !== '' &&
          ride.beginAddress !== '' &&
          directions === undefined &&
          (
            <DirectionsService
              options={{
                destination: ride.destination,
                origin: ride.beginAddress,
                travelMode: TravelMode.DRIVING
              }}
              callback={directionsCallback}
              onLoad={directionsService => {
                console.log('DirectionsService onLoad directionsService: ', directionsService)
              }}
              onUnmount={directionsService => {
                console.log('DirectionsService onUnmount directionsService: ', directionsService)
              }}
            />
          )
        }

        {
          directions !== undefined &&
          (
            <DirectionsRenderer
              options={{
                directions: directions
              }}
              onLoad={directionsRenderer => {
                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
              }}

            />
          )
        }


        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

