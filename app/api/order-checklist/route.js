import { connectToDatabase } from '@/lib/database';
import OrderList from '@/lib/database/models/OrderList.model';

// GET all order lists
export async function GET() {
  try {
    await connectToDatabase();
    const orderLists = await OrderList.find();
    return new Response(JSON.stringify(orderLists), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching order lists', error }), { status: 500 });
  }
}

// POST (create) a new order list
export async function POST(req) {
  try {
    await connectToDatabase();
    const orderListData = await req.json();

    const newOrderList = new OrderList(orderListData);
    await newOrderList.save();

    return new Response(JSON.stringify({ message: 'Order list created successfully!', orderList: newOrderList }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating order list', error }), { status: 500 });
  }
}

// PUT (update) an order list
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, ...updateData } = await req.json();

    const updatedOrderList = await OrderList.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedOrderList) return new Response(JSON.stringify({ message: 'Order list not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Order list updated successfully!', orderList: updatedOrderList }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating order list', error }), { status: 500 });
  }
}

// DELETE an order list
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    const deletedOrderList = await OrderList.findByIdAndDelete(id);
    if (!deletedOrderList) return new Response(JSON.stringify({ message: 'Order list not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Order list deleted successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting order list', error }), { status: 500 });
  }
}
