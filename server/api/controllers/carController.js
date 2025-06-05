import cloudinary from '../utils/cloudinary.js';
import Car from '../models/carModel.js';
import mongoose from 'mongoose';


export const createCar = async (req, res) => {
    try {

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'At least one image is required' });
        }

        // Process image uploads to Cloudinary 

        let uploadPromises = await Promise.all(
            req.files.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image',
                        folder: 'drivenest'
                    });
                    return result.secure_url;
                } catch (err) {
                    console.error(`Failed to upload ${item.originalname}:`, err);
                    return null;
                }
            })
        );

        const imageUrls = await Promise.all(uploadPromises);

        const { brand, modelCategory, model, year, color, carType, forSale, forRent, description } = req.body;

        // Validate required fields
        if (!brand || !modelCategory || !model || !year || !color || !carType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create new car with all data
        const newCar = new Car({
            brand,
            model,
            modelCategory,
            year: parseInt(year),
            color,
            carType,
            forRent,
            forSale,
            description,
            images: imageUrls,
            salesPrice: parseFloat(req.body.salesPrice) || 0,
            rentalPrice: parseFloat(req.body.rentalPrice) || 0,
            mileage: parseInt(req.body.mileage) || 0,
            isAvailable: req.body.isAvailable === 'true',
            inStock: req.body.inStock === 'true',
            availableDate: req.body.isAvailable === 'false' ? new Date(req.body.availableDate) : undefined
        });

        await newCar.save();

        res.status(201).json({
            message: 'Car added successfully',
            car: newCar
        });
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getCars = async (req, res) => {
    try {

        // Get query parameters
        const { forRent, forSale } = req.query;

        // Build filter object
        const filter = {};

        if (forRent === 'true') {
            filter.forRent = true;
        }

        if (forSale === 'true') {
            filter.forSale = true;
        }

        const cars = await Car.find(filter);
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getCarById = async (req, res) => {

    try {

        const { _id } = req.params;
        console.log("Received car ID:", _id);

        // Check if ID is provided
        if (!_id || _id === 'undefined') {
            return res.status(400).json({ error: 'Car ID is required' });
        }

        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid car ID format' });
        }

        const car = await Car.findById(_id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json(car);
    } catch (error) {
        console.error('Error fetching car:', error);
        res.status(500).json({ error: 'Server error' });
    }
}