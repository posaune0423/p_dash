import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import FilterMenu from '../FilterMenu/FilterMenu';
import { Link } from 'react-router-dom';
import {usePixelawProvider} from "@/providers/PixelawProvider";
import {useEntityQuery} from "@dojoengine/react";
import {getComponentValue, Has} from "@dojoengine/recs";
import {proposals} from "@/global/constants";

interface ProposalListProps {
  headerHeight: number;
}

const ProposalList: React.FC<ProposalListProps> = ({ headerHeight }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Closed'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [voteType, setVoteType] = useState<'for' | 'against'>('for');
  const [votePoints, setVotePoints] = useState<number | string>(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };
    const handleClickOutsideModal = (event: MouseEvent) => { // Add this function
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedProposal(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideModal); // Add this line
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideModal); // Add this line
    };
  }, []);

  const { gameData } = usePixelawProvider();
  const proposalArray = useEntityQuery([Has(gameData!.setup.contractComponents.Proposal)])
      .map(entity => getComponentValue(gameData!.setup.contractComponents.Proposal, entity));
  console.log({ proposalArray })

  const filteredProposals = proposals.filter(proposal => {
    if (statusFilter !== 'All') {
      if (statusFilter === 'Active' && !proposal.status.startsWith('end in')) {
        return false;
      }
      if (statusFilter === 'Closed' && proposal.status !== 'closed') {
        return false;
      }
    }
    if (searchTerm) {
      return proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             proposal.proposer.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    if (status.startsWith('end in')) {
      return 'bg-green-500';
    } else if (status === 'closed') {
      return 'bg-purple-500';
    } else {
      return 'bg-gray-500';
    }
  };

  const handleVote = (proposal: any) => {
    setSelectedProposal(proposal);
    setVotePoints(0);
  };

  const extractHexColor = (title: string) => {
    const match = title.match(/#[0-9A-Fa-f]{6}/);
    return match ? match[0].toUpperCase() : null;
  };

  const closeModal = () => {
    setSelectedProposal(null);
  };

  const toggleVoteType = () => {
    setVoteType(voteType === 'for' ? 'against' : 'for');
  };

  const handleVotePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVotePoints(value === '' ? '' : Number(value));
  };

  return (
    <div className=''>
      <div className={`flex items-center justify-between mb-4 ${selectedProposal ? 'blur' : ''}`}>
        <div className='relative w-1/3'>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full p-2 pl-10 bg-gray-800 rounded-md text-white'
          />
          <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
            <FaSearch />
          </span>
        </div>
        <div className='ml-1 relative flex items-center'>
          <button 
            className='bg-gray-700 text-white px-4 py-2 rounded-md'
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FaFilter />
          </button>
          {filterOpen && (
            <div 
              className='absolute mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10' 
              ref={filterRef}
              style={{ top: '100%', right: 0 }}
            >
              <FilterMenu statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            </div>
          )}
        </div>
        <div className='ml-auto'>
          <Link to="/new-proposal" className='bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-lg hover:bg-blue-500 transition duration-300'>
            Create A New Proposal
          </Link>
        </div>
      </div>
      <div className={`overflow-y-auto px-6 ${selectedProposal ? 'blur' : ''}`} style={{ height: `calc(100vh - ${headerHeight}px - 112px)` }}>
        <div className='space-y-4'>
          {filteredProposals.map((proposal, index) => {
            const hexColor = extractHexColor(proposal.title);
            return (
              <div key={index} className='relative bg-gray-800 p-4 rounded-md border border-gray-700 hover:border-gray-600 transition-colors duration-300'>
                <div className='block'>
                  <div className='flex justify-between items-center mb-1'>
                    <div className='text-xl font-bold text-white flex items-center'>
                      {proposal.title}
                      {hexColor && (
                        <div 
                          className='w-6 h-6 rounded-md ml-2' 
                          style={{ backgroundColor: hexColor }}
                        ></div>
                      )}
                    </div>
                    <div className={`px-2 py-1 rounded-md text-white text-sm ${getStatusColor(proposal.status)}`}>
                      {proposal.status.startsWith('end in') ? proposal.status : 'closed'}
                    </div>
                  </div>
                  <div className='text-gray-400 text-sm mb-2'>
                    proposed by {proposal.proposer}
                  </div>
                  <div className='bg-gray-700 rounded-full h-2 relative flex mb-1 mr-20'>
                    <div 
                      className='bg-green-500 h-full rounded-l-full'
                      style={{ width: `${(proposal.forPoints / (proposal.forPoints + proposal.againstPoints)) * 100}%` }}
                    ></div>
                    <div 
                      className='bg-red-500 h-full rounded-r-full'
                      style={{ width: `${(proposal.againstPoints / (proposal.forPoints + proposal.againstPoints)) * 100}%` }}
                    ></div>
                  </div>
                  <div className='flex justify-between text-sm text-gray-300 mr-20'>
                    <div>
                      For {proposal.forPoints} points
                    </div>
                    <div>
                      Against {proposal.againstPoints} points
                    </div>
                  </div>
                </div>
                <button 
                  className={`absolute bottom-4 right-4 px-4 py-2 rounded-md transition duration-300 ${
                    proposal.status === 'closed' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                  onClick={() => handleVote(proposal)}
                  disabled={proposal.status === 'closed'}
                >
                  Vote
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {selectedProposal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20'>
          <div ref={modalRef} className='bg-gray-800 text-white p-6 rounded-lg shadow-lg w-1/3'>
            <h2 className='text-xl font-bold mb-4 flex items-center'>
              {selectedProposal.title}
              {extractHexColor(selectedProposal.title) && (
                <div 
                  className='w-6 h-6 rounded-md ml-2' 
                  style={{ backgroundColor: extractHexColor(selectedProposal.title) || undefined }}
                ></div>
              )}
            </h2>
            <div className='flex justify-between items-center mb-4'>
              <button 
                className={`w-full p-2 rounded-md ${voteType === 'for' ? 'bg-blue-600' : 'bg-gray-600'}`} 
                onClick={toggleVoteType}
              >
                For
              </button>
              <button 
                className={`w-full p-2 rounded-md ml-4 ${voteType === 'against' ? 'bg-blue-600' : 'bg-gray-600'}`} 
                onClick={toggleVoteType}
              >
                Against
              </button>
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Voting Power(PX)</label>
              <input 
                type='number' 
                value={votePoints} 
                onChange={handleVotePointsChange} 
                className='w-full p-2 border rounded-md bg-gray-700 text-white'
              />
            </div>
            <div className='flex justify-end'>
              <button className='bg-gray-600 text-white px-4 py-2 rounded-md mr-2' onClick={closeModal}>Cancel</button>
              <button className='bg-blue-600 text-white px-4 py-2 rounded-md'>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalList;
