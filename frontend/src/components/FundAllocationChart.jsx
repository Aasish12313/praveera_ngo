'use client';
import { ResponsivePie } from '@nivo/pie';

const data = [
  { id: 'Direct Programs', label: 'Direct Programs', value: 1598400, color: '#3B82F6' },
  { id: 'Administrative', label: 'Administrative', value: 491200, color: '#10B981' },
  { id: 'Fundraising', label: 'Fundraising', value: 245600, color: '#F59E0B' },
  { id: 'Emergency Fund', label: 'Emergency Fund', value: 122800, color: '#EF4444' },
];

const FundAllocationChart = () => (
  <div className="bg-white p-6 rounded-xl shadow-md h-[360px] border border-gray-100">
    <h2 className="text-lg font-bold text-gray-800 mb-2">💸 Fund Allocation Breakdown</h2>
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
      innerRadius={0.6}
      padAngle={0.8}
      cornerRadius={3}
      activeOuterRadiusOffset={6}
      colors={{ datum: 'data.color' }}
      arcLinkLabelsSkipAngle={10}
      arcLabelsSkipAngle={10}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
      tooltip={({ datum }) => (
        <div className="text-sm font-medium text-gray-800">
          {datum.label}: ₹{datum.value.toLocaleString()}
        </div>
      )}
    />
  </div>
);

export default FundAllocationChart;
