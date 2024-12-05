import React from "react";

const FollowUpHistory = ({ followUps }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Follow Up History</h2>
      <div className="grid grid-cols-[30px_1fr] gap-4">
       
        {followUps.map((followUp, index) => (
          <React.Fragment key={index}>
            
            <div className="flex items-center justify-center">
              <div className="relative">
                
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                  {followUps.length - index}
                </div>
                
                {index < followUps.length - 1 && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-blue-500"></div>
                )}
              </div>
            </div>

            
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="col-span-2">
                  <p className="font-medium">{followUp.followUpDate}</p>
                  <p className="text-sm text-gray-500">{followUp.createdBy}</p>
                </div>
                <div>
                  <span
                    className={`py-1 px-3 rounded-full text-sm ${
                      followUp.status === "Not Interested"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {followUp.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <p>{followUp.summary}</p>
                </div>
                <div>
                  <p>{followUp.leadDate}</p>
                  <p className="text-sm text-gray-500">{followUp.nextFollowUpDate || "-"}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Sample Data
const sampleFollowUps = [
  {
    followUpDate: "23-08-2024 12:05:00",
    createdBy: "Sreejith",
    status: "Not Interested",
    summary:
      "Due to Clients internal policies and long-term contracts with another provider, they are unable to proceed with the computer rental service at this time.",
    leadDate: "25-08-2024",
    nextFollowUpDate: "-",
  },
  {
    followUpDate: "18-08-2024 12:05:00",
    createdBy: "Sreejith",
    status: "Warm",
    summary: "Interested",
    leadDate: "25-08-2024",
    nextFollowUpDate: "23-08-2024 12:05:00",
  },
  {
    followUpDate: "15-08-2024 12:05:00",
    createdBy: "Sreejith",
    status: "Warm",
    summary: "Interested",
    leadDate: "25-08-2024",
    nextFollowUpDate: "18-08-2024 12:05:00",
  },
  {
    followUpDate: "12-08-2024 12:05:00",
    createdBy: "Sreejith",
    status: "Warm",
    summary: "Interested",
    leadDate: "25-08-2024",
    nextFollowUpDate: "15-08-2024 12:05:00",
  },
];

// Usage Example
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <FollowUpHistory followUps={sampleFollowUps} />
    </div>
  );
}
