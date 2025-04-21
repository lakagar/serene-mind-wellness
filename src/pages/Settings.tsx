
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="container max-w-4xl py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" />
            <CardTitle>Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your therapy sessions
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded about upcoming sessions
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Session Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Session Preferences</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Default Session Duration</Label>
                <RadioGroup defaultValue="30">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30" id="30min" />
                    <Label htmlFor="30min">30 minutes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="45" id="45min" />
                    <Label htmlFor="45min">45 minutes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="60" id="60min" />
                    <Label htmlFor="60min">60 minutes</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to others
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <Button className="bg-wellness-primary hover:bg-wellness-secondary">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
