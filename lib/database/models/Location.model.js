// models/Location.model.js
import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cities: [citySchema], // Array of cities within the state
});

const locationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    unique: true,
  },
  states: [stateSchema], // Array of states within the country
});

export default mongoose.models.Location || mongoose.model('Location', locationSchema);
