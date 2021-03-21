import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VehicleTypeContext } from '../../App';
import fakeData from '../../fakeData/vehicles.json';
import AvailableVehicle from '../AvailableVehicle/AvailableVehicle';




const SearchForm = () => {

    const [selectedVehicles] = useContext(VehicleTypeContext);
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [showVehicles, setShowVehicles] = useState(false);
    const [destination, setDestination] = useState({})
    // console.log(availableVehicles);
    useEffect(() => {
        const vehicles = fakeData.filter(vehicle => vehicle.vehicleType === selectedVehicles);
        // console.log(vehicles);
        showVehicles && setAvailableVehicles(vehicles);
    }, [selectedVehicles, showVehicles])

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
        setDestination({ ...data })
        setShowVehicles(true);
    };

    // console.log(watch().from, watch().to);
    return (

        <div className="card p-3 bg-light">

            {!showVehicles &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label for="from" class="form-label">Pick From</label>
                        <input name="from" id="from" className="form-control" defaultValue="Mirpur 1" type="text" placeholder="From" ref={register({ required: true })} />
                        {errors.from && <span className="text-danger">Pick from is required</span>}
                    </div>
                    <div className="mb-3">
                        <label for="to" class="form-label">Pick To</label>
                        <input name="to" id="to" className="form-control" defaultValue="Danmondi" type="text" placeholder="To" ref={register({ required: true })} />
                        {errors.to && <span className="text-danger">Pick to is required</span>}
                    </div>
                    <div className="mb-3">
                        <label for="date" class="form-label">Date</label>
                        <input name="date" id="date" className="form-control" type="date" placeholder="Date" ref={register({ required: true })} />
                        {errors.date && <span className="text-danger">Date is required</span>}
                    </div>
                    <div className="mb-3">
                        <label for="time" class="form-label">Time</label>
                        <input name="time" id="date" className="form-control" type="time" placeholder="Time" ref={register({ required: true })} />
                        {errors.Time && <span className="text-danger">Time is required</span>}
                    </div>
                    <input className="btn btn-secondary d-block w-100 btn-round" type="submit" value="Search" />
                </form>
            }
            {showVehicles &&
                <div className="bg-secondary text-light py-4 ps-3 rounded">
                    <h3>{destination.from} to {destination.to}</h3>
                    <h6>Data: {destination.date}</h6>
                    <h6>Time: {destination.time}</h6>
                </div>
            }
            {availableVehicles.map(vehicle => <AvailableVehicle key={vehicle.id} vehicle={vehicle} />)}
        </div>
    );
};

export default SearchForm;