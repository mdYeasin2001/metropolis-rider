import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VehicleTypeContext } from '../../App';
import fakeData from '../../fakeData/vehicles.json';
import AvailableVehicle from '../AvailableVehicle/AvailableVehicle';




const SearchForm = () => {

    const [selectedVehicles] = useContext(VehicleTypeContext);
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [showVehicles, setShowVehicles] = useState(false);
    console.log(availableVehicles);
    useEffect(() => {
        const vehicles = fakeData.filter(vehicle => vehicle.vehicleType === selectedVehicles);
        // console.log(vehicles);
        showVehicles && setAvailableVehicles(vehicles);
    }, [selectedVehicles, showVehicles])

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        setShowVehicles(true);
    };

    // console.log(watch("example"));
    return (

        <div className="col-md-4">
            <div className="card p-3 bg-light">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label for="from" class="form-label">Pick From</label>
                        <input name="from" id="from" className="form-control"  defaultValue="Mirpur 1" type="text" placeholder="From" ref={register({ required: true })} />
                        {errors.from && <span className="text-danger">Pick from is required</span>}
                    </div>

                    <div className="mb-3">
                        <label for="to" class="form-label">Pick To</label>
                        <input name="to" id="to" className="form-control"  defaultValue="Danmondi" type="text" placeholder="To" ref={register({ required: true })} />
                        {errors.to && <span className="text-danger">Pick to is required</span>}
                    </div>

                    <div className="mb-3">
                        <label for="date" class="form-label">Date</label>
                        <input name="date" id="date" className="form-control" type="date" placeholder="Date" ref={register({ required: true })} />
                        {errors.date && <span className="text-danger">Date is required</span>}
                    </div>




                    <input className="btn btn-primary d-block w-100" type="submit" value="Search" />
                </form>
                {availableVehicles.map(vehicle => <AvailableVehicle key={vehicle.id} vehicle={vehicle}/> )}

            </div>
        </div>
    );
};

export default SearchForm;