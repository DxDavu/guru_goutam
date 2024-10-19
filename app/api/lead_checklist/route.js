/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from '@/lib/database';
import LeadChecklist from '@/lib/database/models/LeadChecklist.model'; // Ensure you have a model for LeadChecklist

// GET all lead checklists
export async function GET() {
  try {
    await connectToDatabase();
    const leadChecklists = await LeadChecklist.find();

    return new Response(JSON.stringify(leadChecklists), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching lead checklists', error }), { status: 500 });
  }
}
export async function POST(req) {
  try {
    await connectToDatabase();
    const leadChecklistData = await req.json();

    // Create a new LeadChecklist instance
    const newLeadChecklist = new LeadChecklist(leadChecklistData);
    await newLeadChecklist.save();

    return new Response(JSON.stringify({ message: 'Lead Checklist created successfully!', leadChecklist: newLeadChecklist }), { status: 201 });
  } catch (error) {
    console.error('Error creating lead checklist:', error);
    return new Response(JSON.stringify({ message: 'Error creating lead checklist', error }), { status: 500 });
  }
}

// PUT (update) a lead checklist
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, checklist_name, description, active_status } = await req.json();

    const updatedLeadChecklist = await LeadChecklist.findByIdAndUpdate(id, {
      checklist_name,
      description,
      active_status,
    }, { new: true });

    if (!updatedLeadChecklist) {
      return new Response(JSON.stringify({ message: 'Lead Checklist not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Lead Checklist updated successfully!', leadChecklist: updatedLeadChecklist }), { status: 200 });
  } catch (error) {
    console.error('Error updating lead checklist:', error);
    return new Response(JSON.stringify({ message: 'Error updating lead checklist', error }), { status: 500 });
  }
}

// DELETE a lead checklist
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    const deletedLeadChecklist = await LeadChecklist.findByIdAndDelete(id);
    if (!deletedLeadChecklist) {
      return new Response(JSON.stringify({ message: 'Lead Checklist not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Lead Checklist deleted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error during deletion:', error);
    return new Response(JSON.stringify({ message: 'Error deleting lead checklist', error }), { status: 500 });
  }
}
