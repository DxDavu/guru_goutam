/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from '@/lib/database';
import TaxList from '@/lib/database/models/TaxList.model'; // Ensure you have a model for TaxList

// GET all tax list entries
export async function GET() {
  try {
    await connectToDatabase();
    const taxListEntries = await TaxList.find();

    return new Response(JSON.stringify(taxListEntries), { status: 200 });
  } catch (error) {
    console.error('Error fetching tax list entries:', error);
    return new Response(JSON.stringify({ message: 'Error fetching tax list entries', error }), { status: 500 });
  }
}

// POST (create) a new tax list entry
export async function POST(req) {
  try {
    await connectToDatabase();
    const taxListData = await req.json();

    const newTaxList = new TaxList(taxListData);
    await newTaxList.save();

    return new Response(JSON.stringify({ message: 'Tax List entry created successfully!', taxList: newTaxList }), { status: 201 });
  } catch (error) {
    console.error('Error creating tax list entry:', error);
    return new Response(JSON.stringify({ message: 'Error creating tax list entry', error }), { status: 500 });
  }
}
export async function PUT(req) {
    try {
      await connectToDatabase();
      const { id, tax_name, percentage_cgst, percentage_sgst, active_status } = await req.json();
  
      console.log('Received data for update:', { id, tax_name, percentage_cgst, percentage_sgst, active_status });
  
      const updatedTaxList = await TaxList.findByIdAndUpdate(
        id,
        { tax_name, percentage_cgst, percentage_sgst, active_status },
        { new: true }
      );
  
      if (!updatedTaxList) {
        return new Response(JSON.stringify({ message: 'Tax List entry not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Tax List entry updated successfully!', taxList: updatedTaxList }), { status: 200 });
    } catch (error) {
      console.error('Error updating tax list entry:', error);
      return new Response(JSON.stringify({ message: 'Error updating tax list entry', error }), { status: 500 });
    }
  }
  
// DELETE a tax list entry
export async function DELETE(req) {
    try {
      await connectToDatabase();
      
      // Extracting the 'id' from the request body
      const { id } = await req.json(); // This should match with the JSON structure sent from the front-end
  
      // Checking if the ID exists in the request body
      if (!id) {
        return new Response(JSON.stringify({ message: 'ID is required to delete a tax list entry' }), { status: 400 });
      }
  
      // Attempting to find and delete the tax list entry by ID
      const deletedTaxList = await TaxList.findByIdAndDelete(id);
  
      // Handling the case where the tax list entry is not found
      if (!deletedTaxList) {
        return new Response(JSON.stringify({ message: 'Tax List entry not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Tax List entry deleted successfully!' }), { status: 200 });
    } catch (error) {
      console.error('Error during deletion:', error);
      return new Response(JSON.stringify({ message: 'Error deleting tax list entry', error }), { status: 500 });
    }
  }
  