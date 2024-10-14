import { connectToDatabase } from '@/lib/database';
import LeadStatus from '@/lib/database/models/LeadStatus.model';

// GET all lead statuses
export async function GET() {
  try {
    await connectToDatabase();
    const leadStatuses = await LeadStatus.find();
    return new Response(JSON.stringify(leadStatuses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching lead statuses', error }), { status: 500 });
  }
}

// POST (create) a new lead status
export async function POST(req) {
  try {
    await connectToDatabase();
    const leadStatusData = await req.json();

    const newLeadStatus = new LeadStatus(leadStatusData);
    await newLeadStatus.save();

    return new Response(JSON.stringify({ message: 'Lead status created successfully!', leadStatus: newLeadStatus }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating lead status', error }), { status: 500 });
  }
}

// PUT (update) a lead status
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, ...updateData } = await req.json();

    const updatedLeadStatus = await LeadStatus.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedLeadStatus) return new Response(JSON.stringify({ message: 'Lead status not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Lead status updated successfully!', leadStatus: updatedLeadStatus }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating lead status', error }), { status: 500 });
  }
}

// DELETE a lead status
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    const deletedLeadStatus = await LeadStatus.findByIdAndDelete(id);
    if (!deletedLeadStatus) return new Response(JSON.stringify({ message: 'Lead status not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Lead status deleted successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting lead status', error }), { status: 500 });
  }
}
