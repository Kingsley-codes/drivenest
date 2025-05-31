import mongoose from "mongoose";


const carSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: [true, 'brand is required'],
            trim: true,
        },
        modelCategory: {
            type: String, // e.g., SUV, sedan, etc.
            required: [true, 'modelCategory is required'],

        },

        year: {
            type: Array,
            required: [true, 'Year is required'],
        },
        forSale: {
            type: Boolean,
            default: true, // Indicates if the car is for sale
        },
        forRent: {
            type: Boolean,
            default: true, // Indicates if the car is for rent
        },
        color: {
            type: Array,
            required: [true, 'Color is required'],
            trim: true,
        },
        carType: {
            type: String, // e.g., regular, 'luxury', 'electric
            required: [true, 'carType is required'],
        },

        salesPrice: {
            type: Number, // Price for sale
        },
        rentalPrice: {
            type: Number, // Price for rent
        },
        mileage: {
            type: Number,
        },
        inStock: {
            type: Boolean,
            default: true, // Indicates if the car is in stock
        },
        // Availability
        isAvailable: {
            type: Boolean,
            default: true,
        },
        availableDate: {
            type: Date,
            required: function () { return !this.isAvailable; }
        },

        // Media
        images: {
            type: Array,
            required: true
        }, // Array of image URLs

        videos: [String],

        // Additional information
        description: String,

        // Timestamps
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;