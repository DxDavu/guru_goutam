/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from '@/lib/database';
import Location from '@/lib/database/models/Location.model'; // Ensure you have a model for Location

// GET all locations
export async function GET() {
  try {
    await connectToDatabase();
    const locations = await Location.find();

    return new Response(JSON.stringify(locations), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching locations', error }), { status: 500 });
  }
}

// POST (create) a new location
export async function POST(req) {
  try {
    await connectToDatabase();
    const locationData = await req.json();

    const newLocation = new Location(locationData);
    await newLocation.save();

    return new Response(JSON.stringify({ message: 'Location created successfully!', location: newLocation }), { status: 201 });
  } catch (error) {
    console.error('Error creating location:', error);
    return new Response(JSON.stringify({ message: 'Error creating location', error }), { status: 500 });
  }
}

// PUT (update) a location
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, country, state, city } = await req.json();

    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { country, state, city },
      { new: true } // Return the updated document
    );

    if (!updatedLocation) {
      return new Response(JSON.stringify({ message: 'Location not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Location updated successfully!', location: updatedLocation }), { status: 200 });
  } catch (error) {
    console.error('Error updating location:', error);
    return new Response(JSON.stringify({ message: 'Error updating location', error }), { status: 500 });
  }
}

// DELETE a location
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    const deletedLocation = await Location.findByIdAndDelete(id);
    if (!deletedLocation) {
      return new Response(JSON.stringify({ message: 'Location not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Location deleted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error during deletion:', error);
    return new Response(JSON.stringify({ message: 'Error deleting location', error }), { status: 500 });
  }
}
