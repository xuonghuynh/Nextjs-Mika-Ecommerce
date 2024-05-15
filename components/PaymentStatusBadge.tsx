import React from 'react';

interface BadgeProps {
  status: string;
}

const PaymentBadge: React.FC<BadgeProps> = ({ status }) => {
  let backgroundColor;
  let textColor = 'text-white';

  switch (status) {
    case 'paid':
      backgroundColor = 'bg-green-500/20';
      textColor = 'text-green-500';
      break;
    case 'unpaid':
      backgroundColor = 'bg-red-500/20';
      textColor = 'text-red-500';
      break;
    case 'processing':
      backgroundColor = 'bg-orange-500/20';
      textColor = 'text-orange-500';
      break;
    default:
      backgroundColor = 'bg-gray-500/20';
      textColor = 'text-white';
  }

  return (
    <div
      className={`inline-block px-3 py-1 rounded ${textColor} ${backgroundColor} capitalize`}
    >
      {status}
    </div>
  );
};

export default PaymentBadge;
