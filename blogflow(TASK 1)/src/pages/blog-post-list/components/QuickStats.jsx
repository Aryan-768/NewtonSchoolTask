import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Posts',
      value: stats?.totalPosts || 0,
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      label: 'Authors',
      value: stats?.totalAuthors || 0,
      icon: 'Users',
      color: 'text-secondary'
    },
    {
      label: 'Categories',
      value: stats?.totalCategories || 0,
      icon: 'Tag',
      color: 'text-accent'
    },
    {
      label: 'This Month',
      value: stats?.postsThisMonth || 0,
      icon: 'Calendar',
      color: 'text-success'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-moderate transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {item?.label}
              </p>
              <p className="text-2xl font-heading font-bold text-card-foreground">
                {item?.value?.toLocaleString()}
              </p>
            </div>
            <div className={`p-2 rounded-lg bg-muted ${item?.color}`}>
              <Icon name={item?.icon} size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;