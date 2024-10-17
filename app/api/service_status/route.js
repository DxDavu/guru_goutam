/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/service-status/route.js
import { connectToDatabase } from '@/lib/database';
import ServiceStatus from '@/lib/database/models/ServiceStatus.model'; // Ensure you have a model for ServiceStatus

// GET all service statuses
export async function GET() {
  try {
    await connectToDatabase();
    const serviceStatuses = await ServiceStatus.find();

    return new Response(JSON.stringify(serviceStatuses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching service statuses', error }), { status: 500 });
  }
}

// POST (create) a new service status
export async function POST(req) {
  try {
    await connectToDatabase();
    const serviceStatusData = await req.json();

    console.log('Service Status data received:', serviceStatusData);

    const newServiceStatus = new ServiceStatus(serviceStatusData);
    await newServiceStatus.save();

    return new Response(JSON.stringify({ message: 'Service Status created successfully!', serviceStatus: newServiceStatus }), { status: 201 });
  } catch (error) {
    console.error('Error creating service status:', error);
    return new Response(JSON.stringify({ message: 'Error creating service status', error }), { status: 500 });
  }
}

// PUT (update) a service status
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, ...updateData } = await req.json(); // Extract `id` and other fields

    // Update the service status by ID
    const updatedServiceStatus = await ServiceStatus.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedServiceStatus) {
      return new Response(JSON.stringify({ message: 'Service Status not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Service Status updated successfully!', serviceStatus: updatedServiceStatus }), { status: 200 });
  } catch (error) {
    console.error('Error updating service status:', error);
    return new Response(JSON.stringify({ message: 'Error updating service status', error }), { status: 500 });
  }
}


export async function DELETE(req) {
    try {
      await connectToDatabase();
      const { id } = await req.json(); // Ensure you're getting the ID from the request body
  
      const deletedServiceStatus = await ServiceStatus.findByIdAndDelete(id); // Use the correct method to find by ID
      if (!deletedServiceStatus) {
        return new Response(JSON.stringify({ message: 'Service Status not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Service Status deleted successfully!' }), { status: 200 });
    } catch (error) {
      console.error('Error during deletion:', error); // Add error logging for debugging
      return new Response(JSON.stringify({ message: 'Error deleting service status', error }), { status: 500 });
    }
  }
  