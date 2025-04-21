
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { getUserEmail } from '@/utils/auth';

const Profile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const email = getUserEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Profile update logic will be implemented with Supabase
  };

  return (
    <div className="container max-w-4xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-8">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-wellness-primary text-white">
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{name || 'Your Name'}</h2>
              <p className="text-muted-foreground">{email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
              />
            </div>

            <Button type="submit" className="bg-wellness-primary hover:bg-wellness-secondary">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
