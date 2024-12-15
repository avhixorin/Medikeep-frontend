import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import React from 'react';

const Security: React.FC = () => {
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Security</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account privacy and security settings.
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Account Privacy</Label>
              <div className="text-sm text-muted-foreground">
                Toggle between private and public account settings.
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Two-Factor Authentication</Label>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security to your account.
              </div>
            </div>
            <Switch />
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-md font-medium">Account Management</h3>
            <div className="space-y-2 mt-4">
              <p className="text-sm text-muted-foreground">
                Deactivating your account will disable your profile and remove your data from public view. You can reactivate your account at any time by logging in again.
              </p>
              <Button variant="destructive" size="sm">
                Deactivate Account
              </Button>
            </div>
            <div className="space-y-2 mt-6">
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action is irreversible.
              </p>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
