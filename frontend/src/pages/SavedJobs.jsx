import React from "react";

const SavedJobs = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return <p>No saved jobs yet.</p>;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job, index) => {
        console.log(`🔍 JOB #${index + 1}:`, job);
        console.log("🏢 COMPANY:", job.company);

        return (
          <div
            key={job._id}
            className="border p-4 rounded shadow bg-white"
          >
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Company:</strong> {job.company?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {job.location || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Type:</strong> {job.jobType || "N/A"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SavedJobs;
