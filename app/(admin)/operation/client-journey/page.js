"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClientJourneyPage() {
  const [clientJourneyData, setClientJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchClientJourneyData = async () => {
      try {
        const response = await axios.get('/api/client-journey'); // Replace with your API endpoint
        setClientJourneyData(response.data);
      } catch (error) {
        console.error('Error fetching client journey data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientJourneyData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!clientJourneyData) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Client Journey</h1>

      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Client Information</h2>
        <p><strong>Client ID:</strong> {clientJourneyData.client}</p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Leads</h2>
        {clientJourneyData.leads.length > 0 ? (
          <ul>
            {clientJourneyData.leads.map((lead, index) => (
              <li key={index}>Lead ID: {lead}</li>
            ))}
          </ul>
        ) : (
          <p>No leads available.</p>
        )}

        <h2 className="text-xl font-semibold mt-4 mb-2">Quotations</h2>
        {clientJourneyData.quotations.length > 0 ? (
          <ul>
            {clientJourneyData.quotations.map((quotation, index) => (
              <li key={index}>Quotation ID: {quotation}</li>
            ))}
          </ul>
        ) : (
          <p>No quotations available.</p>
        )}

        <h2 className="text-xl font-semibold mt-4 mb-2">Orders</h2>
        {clientJourneyData.orders.length > 0 ? (
          <ul>
            {clientJourneyData.orders.map((order, index) => (
              <li key={index}>Order ID: {order}</li>
            ))}
          </ul>
        ) : (
          <p>No orders available.</p>
        )}

        <h2 className="text-xl font-semibold mt-4 mb-2">Delivery Challans</h2>
        {clientJourneyData.delivery_challans.length > 0 ? (
          <ul>
            {clientJourneyData.delivery_challans.map((dc, index) => (
              <li key={index}>DC ID: {dc}</li>
            ))}
          </ul>
        ) : (
          <p>No delivery challans available.</p>
        )}

        <h2 className="text-xl font-semibold mt-4 mb-2">GRNs</h2>
        {clientJourneyData.grns.length > 0 ? (
          <ul>
            {clientJourneyData.grns.map((grn, index) => (
              <li key={index}>GRN ID: {grn}</li>
            ))}
          </ul>
        ) : (
          <p>No GRNs available.</p>
        )}
      </div>
    </div>
  );
}

export default ClientJourneyPage;
