// app/api/terms_conditions/route.ts

import { connectToDatabase } from '@/lib/database';
import Term from '@/lib/database/models/TermsConditions.model.js';

// GET all terms and conditions
export async function GET() {
  try {
    await connectToDatabase(); // Connect to the database
    const terms = await Term.find(); // Fetch all terms from the database
    return new Response(JSON.stringify(terms), { status: 200 });
  } catch (error: unknown) {
    // Type assertion for error
    console.error('Error fetching terms:', error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: 'Error fetching terms', error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ message: 'Error fetching terms', error: 'Unknown error' }), { status: 500 });
  }
}

// POST (create) a new term
export async function POST(req: Request) {
  try {
    await connectToDatabase(); // Connect to the database
    const termData = await req.json(); // Parse the JSON body

    console.log('Received term data:', termData); // Log incoming data for debugging

    const newTerm = new Term(termData); // Create a new term instance
    await newTerm.save(); // Save the term to the database

    return new Response(JSON.stringify({ message: 'Term created successfully!', term: newTerm }), { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating term:', error); // Log the error for debugging
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: 'Error creating term', error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ message: 'Error creating term', error: 'Unknown error' }), { status: 500 });
  }
}
// PUT (update) a term
export async function PUT(req: Request) {
  try {
    await connectToDatabase(); // Ensure database connection

    const { id, ...updateData } = await req.json(); // Parse the JSON body
    console.log('Received update data:', { id, updateData });

    // Check if there's any data to update
    if (Object.keys(updateData).length === 0) {
      return new Response(JSON.stringify({ message: 'No data to update' }), { status: 400 });
    }

    // Update the term in the database
    const updatedTerm = await Term.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTerm) {
      return new Response(JSON.stringify({ message: 'Term not found' }), { status: 404 });
    }

    console.log('Updated term:', updatedTerm);
    return new Response(JSON.stringify({ message: 'Term updated successfully!', term: updatedTerm }), { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating term:', error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: 'Error updating term', error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ message: 'Error updating term', error: 'Unknown error' }), { status: 500 });
  }
}


// DELETE a term
// DELETE a term
export async function DELETE(req: Request) {
    try {
      await connectToDatabase(); // Connect to the database
      const { id } = await req.json(); // Parse the JSON body
  
      const deletedTerm = await Term.findByIdAndDelete(id); // Delete the term by ID
      if (!deletedTerm) return new Response(JSON.stringify({ message: 'Term not found' }), { status: 404 });
  
      return new Response(JSON.stringify({ message: 'Term deleted successfully!' }), { status: 200 });
    } catch (error: unknown) {
      console.error('Error deleting term:', error); // Log the error for debugging
      if (error instanceof Error) {
        return new Response(JSON.stringify({ message: 'Error deleting term', error: error.message }), { status: 500 });
      }
      return new Response(JSON.stringify({ message: 'Error deleting term', error: 'Unknown error' }), { status: 500 });
    }
  }
  