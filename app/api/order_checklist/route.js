/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from '@/lib/database';
import OrderChecklist from '@/lib/database/models/OrderChecklist.model'; // Ensure you have a model for OrderChecklist

// GET all order checklists
export async function GET() {
  try {
    await connectToDatabase();
    const orderChecklists = await OrderChecklist.find();

    return new Response(JSON.stringify(orderChecklists), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching order checklists', error }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const orderChecklistData = await req.json();

    // Create a new OrderChecklist instance
    const newOrderChecklist = new OrderChecklist(orderChecklistData);
    await newOrderChecklist.save();

    return new Response(JSON.stringify({ message: 'Order Checklist created successfully!', orderChecklist: newOrderChecklist }), { status: 201 });
  } catch (error) {
    console.error('Error creating order checklist:', error);
    return new Response(JSON.stringify({ message: 'Error creating order checklist', error }), { status: 500 });
  }
}

// PUT (update) an order checklist
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, checklist_name, description, active_status } = await req.json();

    const updatedOrderChecklist = await OrderChecklist.findByIdAndUpdate(id, {
      checklist_name,
      description,
      active_status,
    }, { new: true });

    if (!updatedOrderChecklist) {
      return new Response(JSON.stringify({ message: 'Order Checklist not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Order Checklist updated successfully!', orderChecklist: updatedOrderChecklist }), { status: 200 });
  } catch (error) {
    console.error('Error updating order checklist:', error);
    return new Response(JSON.stringify({ message: 'Error updating order checklist', error }), { status: 500 });
  }
}

// DELETE an order checklist
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    const deletedOrderChecklist = await OrderChecklist.findByIdAndDelete(id);
    if (!deletedOrderChecklist) {
      return new Response(JSON.stringify({ message: 'Order Checklist not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Order Checklist deleted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error during deletion:', error);
    return new Response(JSON.stringify({ message: 'Error deleting order checklist', error }), { status: 500 });
  }
}
