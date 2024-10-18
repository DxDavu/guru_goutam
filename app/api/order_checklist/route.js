// app/api/order_checklist/route.js

import { connectToDatabase } from '@/lib/database';
import OrderChecklistModel from '@/lib/database/models/order_checklist.model';

// GET all checklists
export async function GET() {
  try {
    await connectToDatabase();
    const checklists = await OrderChecklistModel.find();
    return new Response(JSON.stringify(checklists), { status: 200 });
  } catch (error) {
    console.error('Error fetching checklists:', error);
    return new Response(JSON.stringify({ message: 'Error fetching checklists', error }), { status: 500 });
  }
}

// POST (create) a new checklist
export async function POST(req) {
  try {
    await connectToDatabase();
    const checklistData = await req.json();
    console.log('Received POST data:', checklistData);

    const newChecklist = new OrderChecklistModel(checklistData);
    await newChecklist.save();

    return new Response(JSON.stringify({ message: 'Checklist created successfully!', checklist: newChecklist }), { status: 201 });
  } catch (error) {
    console.error('Error creating checklist:', error);
    return new Response(JSON.stringify({ message: 'Error creating checklist', error }), { status: 500 });
  }
}

// PUT (update) a checklist
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, ...updateData } = await req.json();
    console.log('Received PUT data:', { id, updateData });

    // Check if the ID is valid
    if (!id) {
      return new Response(JSON.stringify({ message: 'Checklist ID is required' }), { status: 400 });
    }

    const updatedChecklist = await OrderChecklistModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedChecklist) {
      return new Response(JSON.stringify({ message: 'Checklist not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Checklist updated successfully!', checklist: updatedChecklist }), { status: 200 });
  } catch (error) {
    console.error('Error updating checklist:', error);
    return new Response(JSON.stringify({ message: 'Error updating checklist', error }), { status: 500 });
  }
}

// DELETE a checklist
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: 'Checklist ID is required' }), { status: 400 });
    }

    const deletedChecklist = await OrderChecklistModel.findByIdAndDelete(id);
    if (!deletedChecklist) {
      return new Response(JSON.stringify({ message: 'Checklist not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Checklist deleted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting checklist:', error);
    return new Response(JSON.stringify({ message: 'Error deleting checklist', error }), { status: 500 });
  }
}
