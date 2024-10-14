import { connectToDatabase } from '@/lib/database';
import LeadChecklist from '@/lib/database/models/LeadChecklist.model';

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

// POST (create) a new lead checklist
export async function POST(req) {
  try {
    await connectToDatabase();
    const leadChecklistData = await req.json();

    const newLeadChecklist = new LeadChecklist(leadChecklistData);
    await newLeadChecklist.save();

    return new Response(JSON.stringify({ message: 'Lead checklist created successfully!', leadChecklist: newLeadChecklist }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating lead checklist', error }), { status: 500 });
  }
}

// PUT (update) a lead checklist
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, ...updateData } = await req.json();

    const updatedLeadChecklist = await LeadChecklist.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedLeadChecklist) return new Response(JSON.stringify({ message: 'Lead checklist not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Lead checklist updated successfully!', leadChecklist: updatedLeadChecklist }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating lead checklist', error }), { status: 500 });
  }
}

// DELETE a lead checklist
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    const deletedLeadChecklist = await LeadChecklist.findByIdAndDelete(id);
    if (!deletedLeadChecklist) return new Response(JSON.stringify({ message: 'Lead checklist not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Lead checklist deleted successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting lead checklist', error }), { status: 500 });
  }
}
