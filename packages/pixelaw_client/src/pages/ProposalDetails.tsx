import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {proposals} from "@/global/constants.ts";

const ProposalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const proposal = proposals.find((p) => p.id === Number(id));
  const headerHeight = 64;

  const getStatusColor = (status: string) => {
    if (status.startsWith('end in')) {
      return 'bg-green-500';
    } else if (status === 'closed') {
      return 'bg-purple-500';
    } else {
      return 'bg-gray-500';
    }
  };

  // State hooks for vote inputs
  const [forVotes, setForVotes] = useState<number | string>(0);
  const [againstVotes, setAgainstVotes] = useState<number | string>(0);

  const handleForVotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForVotes(value === '' ? '' : Number(value));
  };

  const handleAgainstVotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAgainstVotes(value === '' ? '' : Number(value));
  };

  const extractHexColor = (title: string) => {
    const match = title.match(/#[0-9A-Fa-f]{6}/);
    return match ? match[0].toUpperCase() : null;
  };

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  const hexColor = extractHexColor(proposal.title);

  // Calculate the width percentages for the results bar
  const totalPoints = proposal.forPoints + proposal.againstPoints;
  const forPercentage = totalPoints === 0 ? 0 : (proposal.forPoints / totalPoints) * 100;
  const againstPercentage = totalPoints === 0 ? 0 : (proposal.againstPoints / totalPoints) * 100;

  return (
    <div className="min-h-screen bg-gray-900 w-full text-white flex flex-col">
      {/* <div className="flex items-center justify-between p-4 bg-gray-800">
        <Link to="/" className="text-2xl font-bold">
          p/war
        </Link>
        <Link to="/governance" className="text-2xl text-white font-bold absolute left-1/2 transform -translate-x-1/2">
          Governance
        </Link>
        <div className="flex items-center space-x-2">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md">
            Connect Wallet
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md">
            8/10PX
          </button>
        </div>
      </div> */}
      <div className="p-4 flex-grow overflow-auto" style={{ height: `calc(100vh - ${headerHeight}px - 112px)` }}>
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <h2 className="text-3xl font-bold">{proposal.title}</h2>
              {hexColor && (
                <div
                  className="w-6 h-6 rounded-md ml-2"
                  style={{ backgroundColor: hexColor }}
                ></div>
              )}
            </div>
            <div className={`text-white px-4 py-2 rounded-md ${getStatusColor(proposal.status)}`}>
              {proposal.status}
            </div>
          </div>
          <p className="mb-4 text-gray-400">proposed by {proposal.proposer}</p>
          <div className="mb-6">
            <h4 className="text-xl font-bold">Comments</h4>
            <p className="text-gray-400">{proposal.comments}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <h4 className="text-xl font-bold mb-4">Cast your vote</h4>
            <div className="flex items-center mb-4">
              <label className="w-1/4">For</label>
              <input
                type="number"
                value={forVotes}
                onChange={handleForVotesChange}
                className="w-3/4 p-2 rounded-md bg-gray-800 text-white"
              />
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/4">Against</label>
              <input
                type="number"
                value={againstVotes}
                onChange={handleAgainstVotesChange}
                className="w-3/4 p-2 rounded-md bg-gray-800 text-white"
              />
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300">
              VOTE
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Information</h4>
              <p>Start Date: May 21, 2024, 7:30 AM</p>
              <p>End Date: May 22, 2024, 7:30 AM</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Current Results</h4>
              <div className="rounded-full h-2 mb-2 relative">
                <div
                  className="bg-green-500 h-full rounded-r-full"
                  style={{ width: `${forPercentage}%` }}
                ></div>
                <div
                  className="bg-red-500 h-full rounded-r-full"
                  style={{ width: `${againstPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <div>For {proposal.forPoints} points</div>
                <div>Against {proposal.againstPoints} points</div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-xl font-bold mb-4">Votes</h4>
            <div className="bg-gray-700 p-4 rounded-lg">
              <ul>
                10 votes by shora
                {/* {proposal.votes.map((vote, index) => (
                  <li key={index} className="flex justify-between mb-2">
                    <span>{vote.voter}</span>
                    <span>{vote.choice}</span>
                    <span>{vote.points} PX</span>
                  </li>
                ))} */}
              </ul>
              <button className="w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;
