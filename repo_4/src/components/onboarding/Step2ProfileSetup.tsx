import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RiCameraFill } from '@remixicon/react';

interface Step2Props {
  onNext: (data: any) => void;
  initialData: any;
}

export default function Step2ProfileSetup({ onNext, initialData }: Step2Props) {
  const [fullName, setFullName] = useState(initialData.fullName || '');
  const [displayName, setDisplayName] = useState(initialData.displayName || '');
  const [avatar, setAvatar] = useState(initialData.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ fullName, displayName, avatar });
  };

  const getInitials = () => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-[#15161C] border border-white/10 rounded-2xl p-8 mt-20">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Personal Details</h1>
        <p className="text-white/60 text-sm">
          Tell us a bit about yourself so others can recognize you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1C8AF8] to-[#A855F7] flex items-center justify-center text-white text-3xl font-bold cursor-pointer overflow-hidden"
              onClick={handleAvatarClick}
            >
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span>{getInitials()}</span>
              )}
            </div>
            <button
              type="button"
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 w-10 h-10 bg-[#2E3138] border-2 border-[#15161C] rounded-full flex items-center justify-center hover:bg-[#3A3D47] transition-colors"
            >
              <RiCameraFill className="w-5 h-5 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-white text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            required
            className="h-11 bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8] focus:ring-1 focus:ring-[#1C8AF8] shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayName" className="text-white text-sm font-medium">
            Display Name
          </Label>
          <Input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="John"
            required
            className="h-11 bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8] focus:ring-1 focus:ring-[#1C8AF8] shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)]"
          />
          <p className="text-white/40 text-xs">
            This could be your first name or a nickname
          </p>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-[#1C8AF8] hover:bg-[#1C8AF8]/90 text-white font-medium rounded-xl"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
