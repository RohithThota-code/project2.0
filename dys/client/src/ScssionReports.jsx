// SessionReport.js
import React from 'react';
import Graphs from './Graphs';

const SessionReport = ({memoryGameScore }) => {
  const labels = ["Memory Game"];
  const scores = [
    memoryGameScore || 0,
  ];

  return (
    <div>
      <h1>Session Report</h1>
      <Graphs labels={labels} scores={scores} />
    </div>
  );
};

export default SessionReport;
