import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardMetrics = ({ metrics = {} }) => {
  const defaultMetrics = {
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    ...metrics
  };

  const metricCards = [
    {
      id: 'posts',
      title: 'Total Posts',
      value: defaultMetrics?.totalPosts,
      icon: 'FileText',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      change: '+2 this week'
    },
    {
      id: 'likes',
      title: 'Total Likes',
      value: defaultMetrics?.totalLikes,
      icon: 'Heart',
      color: 'bg-success',
      textColor: 'text-success-foreground',
      change: '+15 today'
    },
    {
      id: 'comments',
      title: 'Total Comments',
      value: defaultMetrics?.totalComments,
      icon: 'MessageCircle',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      change: '+8 this week'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metricCards?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card border border-border rounded-lg p-6 shadow-subtle hover:shadow-moderate transition-smooth hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${metric?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={metric?.icon} size={24} color="white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                {metric?.value?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric?.title}
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success font-medium">{metric?.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;