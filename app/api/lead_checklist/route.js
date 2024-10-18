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
    console.error('Error fetching lead checklists:', error);
    return new Response(JSON.stringify({ message: 'Error fetching lead checklists', error }), { status: 500 });
  }
}

// POST (create) a new lead checklist
export async function POST(req) {
  try {
    await connectToDatabase();
    const leadChecklistData = await req.json();

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
    const { id, checklist_name, description, checklist_items, active_status } = await req.json();

    const updatedLeadChecklist = await LeadChecklist.findByIdAndUpdate(id, {
      checklist_name,
      description,
      checklist_items,
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
export async function DELETE(req) {
    try {
      await connectToDatabase();
      
      // Extracting the 'id' from the URL parameters
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop(); // Get the ID from the URL
  
      // Checking if the ID exists in the request URL
      if (!id) {
        return new Response(JSON.stringify({ message: 'ID is required to delete a checklist' }), { status: 400 });
      }
  
      // Attempting to find and delete the lead checklist by ID
      const deletedLeadChecklist = await LeadChecklist.findByIdAndDelete(id);
  
      // Handling the case where the lead checklist is not found
      if (!deletedLeadChecklist) {
        return new Response(JSON.stringify({ message: 'Lead Checklist not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Lead Checklist deleted successfully!' }), { status: 200 });
    } catch (error) {
      console.error('Error during deletion:', error);
      return new Response(JSON.stringify({ message: 'Error deleting lead checklist', error }), { status: 500 });
    }
  }
  