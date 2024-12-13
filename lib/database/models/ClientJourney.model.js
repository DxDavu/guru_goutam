// // @/models/ClientJourney.model.js

// import mongoose, { Schema } from 'mongoose';


// const Client = mongoose.model('Client'); // Reference to your Client model
// const Lead = mongoose.model('Lead'); // Reference to your Lead model
// const Quotation = mongoose.model('Quotation'); // Reference to your Quotation model
// const Order = mongoose.model('Order'); // Reference to your Order model
// const DC = mongoose.model('DC'); // Reference to your DC model
// const GRN = mongoose.model('GRN'); // Reference to your GRN model

// const ClientJourneySchema = new Schema({
//   client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
//   leads: [{ type: Schema.Types.ObjectId, ref: 'Lead' }],
//   quotations: [{ type: Schema.Types.ObjectId, ref: 'Quotation' }],
//   orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
//   delivery_challans: [{ type: Schema.Types.ObjectId, ref: 'DC' }],
//   grns: [{ type: Schema.Types.ObjectId, ref: 'GRN' }]
// }, { timestamps: true });

// // You can use populate to fetch the full details of the referenced models
// export default mongoose.models.ClientJourney || mongoose.model('ClientJourney', ClientJourneySchema);


// const ClientJourneySchema = new Schema({
//   client: {
//     date_of_first_contact: { type: Date, required: true },
//     contact_name: { type: String, required: true },
//     client_code: { type: String, required: true },
//     contact_person: { type: String, required: true },
//     mobile_number: { type: String, required: true },
//     email: { type: String, required: true },
//     client_owner: { type: String, required: true }
//   },
//   leads: [
//     {
//       lead_date: { type: Date, required: true },
//       lead_code: { type: String, required: true },
//       lead_type: { type: String, required: true },
//       lead_owner: { type: String, required: true },
//       lead_title: { type: String, required: true },
//       executed_by: { type: String, required: true },
//       lead_status: { type: String, required: true }
//     }
//   ],
//   quotations: [
//     {
//       quotation_date: { type: Date, required: true },
//       quotation_code: { type: String, required: true },
//       quotation_type: { type: String, required: true },
//       quotation_amount: { type: Number, required: true },
//       quotation_status: { type: String, required: true },
//       executed_by: { type: String, required: true }
//     }
//   ],
//   orders: [
//     {
//       order_date: { type: Date, required: true },
//       order_code: { type: String, required: true },
//       order_amount: { type: Number, required: true },
//       billing_contact: { type: String, required: true },
//       shipping_contact: { type: String, required: true },
//       payment_terms: { type: String, required: true },
//       executive: { type: String, required: true }
//     }
//   ],
//   delivery_challans: [
//     {
//       dc_date: { type: Date, required: true },
//       dc_code: { type: String, required: true },
//       vehicle_number: { type: String, required: false },
//       delivered_staff: { type: String, required: true },
//       receiver_name: { type: String, required: true },
//       receiver_phone_number: { type: String, required: true },
//       shipping_address: { type: String, required: true },
//       dc_status: { type: String, required: true }
//     }
//   ],
//   grns: [
//     {
//       grn_date: { type: Date, required: true },
//       grn_code: { type: String, required: true },
//       informed_person: { type: String, required: true },
//       contact_number: { type: String, required: true },
//       returned_person: { type: String, required: true },
//       received_person: { type: String, required: true },
//       vehicle_number: { type: String, required: false }
//     }
//   ]
// }, { timestamps: true });

// export default mongoose.models.ClientJourney || mongoose.model('ClientJourney', ClientJourneySchema);
