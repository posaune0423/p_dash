import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewProposal: React.FC = () => {
  const [proposalType, setProposalType] = useState('Add Color');
  const [maxPXProposalType, setMaxPXProposalType] = useState('Change Constant');
  const [color, setColor] = useState('#FFFFFF');
  const [comments, setComments] = useState('');
  const [width, setWidth] = useState('0');
  const [height, setHeight] = useState('0');
  const [constant, setConstant] = useState('10');
  const [coefficient1, setCoefficient1] = useState('0');
  const [coefficient2, setCoefficient2] = useState('0');
  const [pxRecoverySpeed, setPxRecoverySpeed] = useState('0');
  const [baseCost, setBaseCost] = useState('1');
  const [victoryCondition, setVictoryCondition] = useState('0');
  const [winnerAddress, setWinnerAddress] = useState('0x0');
  const [banPlayerAddress, setBanPlayerAddress] = useState('0x0');

  const handleSubmit = () => {
    const proposalData = {
      proposalType,
      maxPXProposalType,
      color,
      comments,
      width,
      height,
      constant,
      coefficient1,
      coefficient2,
      pxRecoverySpeed,
      baseCost,
      victoryCondition,
      winnerAddress,
      banPlayerAddress,
    };
    console.log(proposalData);
  };

  return (
    <div className='min-h-screen bg-gray-900 w-fulltext-white flex flex-col'>
      <div className='flex items-center justify-between p-4 bg-gray-800'>
        <Link to="/" className='text-2xl font-bold'>
          p/war
        </Link>
        <Link to="/governance" className='text-2xl text-white font-bold absolute left-1/2 transform -translate-x-1/2'>
          Governance
        </Link>
        <div className='flex items-center space-x-2'>
          <button className='bg-gray-700 text-white px-4 py-2 rounded-md'>
            Connect Wallet
          </button>
          <button className='bg-gray-700 text-white px-4 py-2 rounded-md'>
            8/10PX
          </button>
        </div>
      </div>
      <div className='flex justify-center items-center flex-grow p-4'>
        <div className='w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-lg'>
          <h2 className='text-3xl font-bold mb-6'>New Proposal</h2>
          
          <div className='mb-4'>
            <label className='block text-lg mb-2'>Select Proposal Type</label>
            <select 
              value={proposalType} 
              onChange={(e) => setProposalType(e.target.value)}
              className='w-full p-3 rounded-md bg-gray-700 text-white'
            >
              <option value="Add Color">Add Color</option>
              <option value="Expand Area">Expand Area</option>
              <option value="Change PX Limit">Change PX Limit</option>
              <option value="Change PX Recovery Speed">Change PX Recovery Speed</option>
              <option value="Change Base Cost">Change Base Cost</option>
              <option value="Change Victory Conditions">Change Victory Conditions</option>
              <option value="Ban Player">Ban Player</option>
            </select>
          </div>

          {proposalType === 'Add Color' && (
            <>
              <div className='mb-4'>
                <label className='block text-lg mb-2'>Color(i.e. #00FFAA)</label>
                <input 
                  type="text" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  className='w-full p-2 rounded-md bg-gray-700 text-white'
                />
              </div>
            </>
          )}

          {proposalType === 'Expand Area' && (
            <>
              <div className='mb-4'>
                <label className='block text-lg mb-2'>Width</label>
                <input 
                  type="text" 
                  value={width} 
                  onChange={(e) => setWidth(e.target.value)} 
                  className='w-full p-2 rounded-md bg-gray-700 text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-lg mb-2'>Height</label>
                <input 
                  type="text" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  className='w-full p-2 rounded-md bg-gray-700 text-white'
                />
              </div>
            </>
          )}

          {proposalType === 'Change PX Limit' && (
            <>
              <div className='mb-4'>
                <label className='block text-lg mb-2'>Select Type</label>
                <select 
                  value={maxPXProposalType} 
                  onChange={(e) => setMaxPXProposalType(e.target.value)}
                  className='w-full p-3 rounded-md bg-gray-700 text-white'
                >
                  <option value="Change Constant">Change Constant</option>
                  <option value="Change Coefficient for the number of owns">Change Coefficient for the number of owns</option>
                  <option value="Change Coefficient for commitments">Change Coefficient for commitments</option>
                </select>
              </div>
              { maxPXProposalType === 'Change Constant' && (
                <div className='mb-4'>
                  <label className='block text-lg mb-2'>New Value</label>
                  <input 
                    type="text" 
                    value={constant} 
                    onChange={(e) => setConstant(e.target.value)} 
                    className='w-full p-2 rounded-md bg-gray-700 text-white' 
                  />
                </div>
              )}
              { maxPXProposalType === 'Change Coefficient for the number of owns' && (
                <div className='mb-4'>
                  <label className='block text-lg mb-2'>New Value</label>
                  <input 
                    type="text" 
                    value={coefficient1} 
                    onChange={(e) => setCoefficient1(e.target.value)} 
                    className='w-full p-2 rounded-md bg-gray-700 text-white'
                  />
                </div>
              )}
              { maxPXProposalType === 'Change Coefficient for commitments' && (
                <div className='mb-4'>
                  <label className='block text-lg mb-2'>New Value</label>
                  <input 
                    type="text" 
                    value={coefficient2} 
                    onChange={(e) => setCoefficient2(e.target.value)} 
                    className='w-full p-2 rounded-md bg-gray-700 text-white'
                  />
                </div>
              )}
            </>
          )}

          {proposalType === 'Change PX Recovery Speed' && (
            <div className='mb-4'>
              <label className='block text-lg mb-2'>PX Recovery Speed</label>
              <input 
                type="text" 
                value={pxRecoverySpeed} 
                onChange={(e) => setPxRecoverySpeed(e.target.value)} 
                className='w-full p-2 rounded-md bg-gray-700 text-white'
              />
            </div>
          )}

          {proposalType === 'Change Base Cost' && (
            <div className='mb-4'>
              <label className='block text-lg mb-2'>Base Cost</label>
              <input 
                type="text" 
                value={baseCost} 
                onChange={(e) => setBaseCost(e.target.value)} 
                className='w-full p-2 rounded-md bg-gray-700 text-white'
              />
            </div>
          )}

          {proposalType === 'Change Victory Conditions' && (
            <>
              <div className='mb-4'>
                <label className='block text-lg mb-2'>Victory Condition Type</label>
                <select 
                  value={victoryCondition} 
                  onChange={(e) => setVictoryCondition(e.target.value)}
                  className='w-full p-3 rounded-md bg-gray-700 text-white'
                >
                  <option value="Type 1">The person who owns the most pixels at the end wins</option>
                  <option value="Type 2">Designate a specific person as the winner</option>
                  <option value="Type 3">The person who consumed the most PX wins</option>
                </select>
              </div>
              {victoryCondition === 'Type 2' && (
                <div className='mb-4'>
                  <label className='block text-lg mb-2'>Winner Address</label>
                  <input 
                    type="text" 
                    value={winnerAddress} 
                    onChange={(e) => setWinnerAddress(e.target.value)} 
                    className='w-full p-2 rounded-md bg-gray-700 text-white'
                  />
                </div>
              )}
            </>
          )}

          {proposalType === 'Ban Player' && (
            <div className='mb-4'>
              <label className='block text-lg mb-2'>Player Address</label>
              <input 
                type="text" 
                value={banPlayerAddress} 
                onChange={(e) => setBanPlayerAddress(e.target.value)} 
                className='w-full p-2 rounded-md bg-gray-700 text-white'
              />
            </div>
          )}

          <div className='mb-4'>
            <label className='block text-lg mb-2'>Comments (Option)</label>
            <textarea 
              value={comments} 
              onChange={(e) => setComments(e.target.value)} 
              className='w-full p-2 rounded-md bg-gray-700 text-white'
            ></textarea>
          </div>

          <div className='flex justify-between mt-6'>
            <Link to="/governance" 
              className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300'
            >
              Back
            </Link>
            <button 
              onClick={handleSubmit} 
              className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposal;
