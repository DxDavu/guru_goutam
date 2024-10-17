/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from '@/lib/database';
import ServicePriorityLevel from '@/lib/database/models/ServicePriorityLevel.model'; // Ensure you have a model for ServicePriorityLevel

// GET all service priority levels
export async function GET() {
  try {
    await connectToDatabase();
    const servicePriorityLevels = await ServicePriorityLevel.find();

    return new Response(JSON.stringify(servicePriorityLevels), { status: 200 });
  } catch (error) {
    console.error('Error fetching service priority levels:', error);
    return new Response(JSON.stringify({ message: 'Error fetching service priority levels', error }), { status: 500 });
  }
}

// POST (create) a new service priority level
export async function POST(req) {
  try {
    await connectToDatabase();
    const servicePriorityLevelData = await req.json();

    const newServicePriorityLevel = new ServicePriorityLevel(servicePriorityLevelData);
    await newServicePriorityLevel.save();

    return new Response(JSON.stringify({ message: 'Service Priority Level created successfully!', servicePriorityLevel: newServicePriorityLevel }), { status: 201 });
  } catch (error) {
    console.error('Error creating service priority level:', error);
    return new Response(JSON.stringify({ message: 'Error creating service priority level', error }), { status: 500 });
  }
}

// PUT (update) a service priority level
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, priority_level, description, active_status } = await req.json();

    const updatedServicePriorityLevel = await ServicePriorityLevel.findByIdAndUpdate(id, {
      priority_level,
      description,
      active_status,
    }, { new: true });

    if (!updatedServicePriorityLevel) {
      return new Response(JSON.stringify({ message: 'Service Priority Level not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Service Priority Level updated successfully!', servicePriorityLevel: updatedServicePriorityLevel }), { status: 200 });
  } catch (error) {
    console.error('Error updating service priority level:', error);
    return new Response(JSON.stringify({ message: 'Error updating service priority level', error }), { status: 500 });
  }
}

// DELETE a service priority level
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    const deletedServicePriorityLevel = await ServicePriorityLevel.findByIdAndDelete(id);
    if (!deletedServicePriorityLevel) {
      return new Response(JSON.stringify({ message: 'Service Priority Level not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Service Priority Level deleted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error during deletion:', error);
    return new Response(JSON.stringify({ message: 'Error deleting service priority level', error }), { status: 500 });
  }
}
