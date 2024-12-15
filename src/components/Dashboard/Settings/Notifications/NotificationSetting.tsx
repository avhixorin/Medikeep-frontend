import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

const NotificationSetting: React.FC = () => {
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Turn all notifications on or off
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Email Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive notifications via email
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Push Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Get notifications directly on your device
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>SMS Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive notifications via SMS
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Promotional Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Get updates on new features and promotions
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Weekly Summary</Label>
              <div className="text-sm text-muted-foreground">
                Receive a summary of your activity each week
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSetting;
