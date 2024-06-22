import React from 'react';
import ProposalList from '../components/ProposalList/ProposalList';

const Governance: React.FC = () => {
  const headerHeight = 64; // px

  return (
    <div className='min-h-screen bg-gray-900 w-full text-white flex flex-col'>
      {/* <div className='flex items-center justify-between p-4 bg-gray-800 relative'>
        <Link to="/" className='text-2xl font-bold'>
          p/war
        </Link>
        <div className='text-2xl font-bold absolute left-1/2 transform -translate-x-1/2'>
          Governance
        </div>
        <div className='flex items-center space-x-2'>
          <button className='bg-gray-700 text-white px-4 py-2 rounded-md'>
            Connect Wallet
          </button>
          <button className='bg-gray-700 text-white px-4 py-2 rounded-md'>
            8/10PX
          </button>
        </div>
      </div> */}
      <div className='py-4 px-40 flex-grow overflow-hidden'>
        <ProposalList headerHeight={headerHeight} />
      </div>
    </div>
  );
};

export default Governance;
