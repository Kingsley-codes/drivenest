import cloudinary from '../utils/cloudinary.js';
import Car from '../models/carModel.js';


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

        const { make, modelCategory, year, color, carType, listingType, description } = req.body;

        // Validate required fields
        if (!make || !modelCategory || !year || !color || !carType || !listingType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create new car with all data
        const newCar = new Car({
            make,
            modelCategory,
            year: parseInt(year),
            color,
            carType,
            listingType,
            description,
            images: imageUrls,
            salesPrice: listingType === 'sale' ? parseFloat(req.body.salesPrice) : undefined,
            rentalPrice: listingType === 'rent' ? parseFloat(req.body.rentalPrice) : undefined,
            mileage: parseInt(req.body.mileage) || 0,
            isAvailable: req.body.isAvailable === 'true',
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
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Server error' });
    }
};