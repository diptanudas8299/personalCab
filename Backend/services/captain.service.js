const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    vehicleType,
    vehicleColor,
    vehiclePlate,
    vehicleCapacity,
}) => {
    if (!firstname || !email || !password || !vehicleType || !vehicleColor || !vehiclePlate || !vehicleCapacity) {
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            vehicleType,
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
        },
    });

    return captain;
}