'use client';
import { ResponsivePie } from '@nivo/pie';

const data = [
  { id: 'Education', label: 'Education', value: 40, color: 'hsl(220, 70%, 50%)' },
  { id: 'Healthcare', label: 'Healthcare', value: 30, color: 'hsl(120, 70%, 50%)' },
  { id: 'Clean Water', label: 'Clean Water', value: 15, color: 'hsl(45, 90%, 50%)' },
  { id: 'Women Empowerment', label: 'Women Empowerment', value: 15, color: 'hsl(340, 80%, 60%)' },
];

const ProjectCategoryChart = () => (
  <div className="bg-white p-6 rounded-xl shadow-md h-[420px] hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <h2 className="text-lg font-extrabold text-gray-800 mb-2">🎯 Project Category Distribution</h2>
    <p className="text-sm text-gray-500 mb-4">
      Breakdown of active projects by category
    </p>
    <div className="h-[320px]">
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 60, bottom: 40, left: 60 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={6}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#444"
        arcLinkLabelsThickness={2}
        arcLinkLabelsStraightLength={18}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        tooltip={({ datum }) => (
          <div className="text-sm font-medium text-gray-800">
            {datum.label}: {datum.value}%
          </div>
        )}
        theme={{
          tooltip: {
            container: {
              background: '#fff',
              color: '#333',
              fontSize: 13,
              borderRadius: 6,
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            },
          },
        }}
      />
    </div>
  </div>
);

export default ProjectCategoryChart;
