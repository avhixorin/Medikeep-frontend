import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Billing: React.FC = () => {
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Billing</h2>
          <p className="text-sm text-muted-foreground">
            Manage your billing details, subscription, and payment methods.
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-md font-medium">Subscription Plan</h3>
            <p className="text-sm text-muted-foreground">
              You are currently subscribed to the <strong>Premium Plan</strong>.
            </p>
            <Button size="sm" variant="secondary">
              Change Plan
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium">Payment Method</h3>
            <p className="text-sm text-muted-foreground">
              Update your credit card or other payment methods.
            </p>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter new credit card number"
              />
              <Button size="sm">Update Payment Method</Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium">Billing History</h3>
            <p className="text-sm text-muted-foreground">
              View your past invoices and payment history.
            </p>
            <Button size="sm" variant="outline">
              View History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
