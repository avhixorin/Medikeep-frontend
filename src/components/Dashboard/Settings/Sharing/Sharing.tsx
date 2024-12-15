import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

const Sharing: React.FC = () => {
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Sharing</h2>
          <p className="text-sm text-muted-foreground">
            Manage how your account and content are shared with others.
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-md font-medium">Sharing Preferences</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Allow others to share your content.
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when your content is shared.
                </p>
              </div>
              <Switch />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium">Linked Accounts</h3>
            <p className="text-sm text-muted-foreground">
              Manage accounts linked for sharing purposes (e.g., social media).
            </p>
            <Button size="sm" variant="secondary">
              Manage Linked Accounts
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium">Invite Others</h3>
            <p className="text-sm text-muted-foreground">
              Share an invite link with others to join the platform.
            </p>
            <div className="flex items-center space-x-2">
              <Input type="text" placeholder="Enter email address" />
              <Button size="sm">Send Invite</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sharing;
