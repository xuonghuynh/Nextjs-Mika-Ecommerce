// components/OrderStatusBadge.tsx

import React from 'react';

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  let backgroundColor;
  let textColor;

  console.log(status)

  switch (status) {
    case 'pending':
      backgroundColor = 'bg-yellow-500/20';
      textColor = 'text-yellow-500';
      break;
    case 'processing':
      backgroundColor = 'bg-violet-500/20';
      textColor = 'text-violet-500';
      break;
    case 'shipped':
      backgroundColor = 'bg-green-500/20';
      textColor = 'text-green-500';
      break;
    case 'delivered':
      backgroundColor = 'bg-green-700/20';
      textColor = 'text-green-700';
      break;
    case 'cancelled':
      backgroundColor = 'bg-red-500/20';
      textColor = 'text-red-500';
      break;
    case 'on hold':
      backgroundColor = 'bg-gray-500/20';
      textColor = 'text-gray-500';
      break;
    case 'returned':
      backgroundColor = 'bg-purple-500/20';
      textColor = 'text-purple-500';
      break;
    case 'refunded':
      backgroundColor = 'bg-gray-700/20';
      textColor = 'text-gray-700';
      break;
    default:
      backgroundColor = 'bg-gray-500/20';
      textColor = 'text-gray-500';
  }

  return (
    <div
      className={`inline-block px-3 py-1 rounded ${textColor} ${backgroundColor} capitalize`}
    >
      {status}
    </div>
  );
};

export default OrderStatusBadge;
