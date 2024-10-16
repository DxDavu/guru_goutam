import { connectToDatabase } from '@/lib/database';
import ServicePriorityLevel from '@/lib/database/models/ServicePriorityLevel.model';

// GET all service priority levels
export async function GET() {
  try {
    await connectToDatabase();
    const servicePriorityLevels = await ServicePriorityLevel.find();
    return new Response(JSON.stringify(servicePriorityLevels), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching service priority levels', error }), { status: 500 });
  }
}

// POST (create) a new service priority level
export async function POST(req) {
  try {
    await connectToDatabase();
    const priorityLevelData = await req.json();

    const newPriorityLevel = new ServicePriorityLevel(priorityLevelData);
    await newPriorityLevel.save();

    return new Response(JSON.stringify({ message: 'Service priority level created successfully!', priorityLevel: newPriorityLevel }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating service priority level', error }), { status: 500 });
  }
}

// PUT (update) a service priority level
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, ...updateData } = await req.json();

    const updatedPriorityLevel = await ServicePriorityLevel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPriorityLevel) return new Response(JSON.stringify({ message: 'Service priority level not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Service priority level updated successfully!', priorityLevel: updatedPriorityLevel }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating service priority level', error }), { status: 500 });
  }
}

// DELETE a service priority level
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    const deletedPriorityLevel = await ServicePriorityLevel.findByIdAndDelete(id);
    if (!deletedPriorityLevel) return new Response(JSON.stringify({ message: 'Service priority level not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Service priority level deleted successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting service priority level', error }), { status: 500 });
  }
}
