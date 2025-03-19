import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { User, Settings, Clock, MapPin, Bell, Shield, Accessibility, Save, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    preferredAccessibility: ['Wheelchair Access', 'Mobility Assistance'],
    emergencyContact: 'Sarah Johnson - (555) 987-6543'
  });
  
  const [formData, setFormData] = useState({ ...profileData });
  
  const recentRides = [
    {
      id: 'ride-001',
      date: 'Aug 15, 2023',
      time: '3:45 PM',
      from: '123 Main Street',
      to: 'Central Hospital',
      driver: 'Michael S.',
      amount: '$35.50',
      status: 'completed'
    },
    {
      id: 'ride-002',
      date: 'Aug 10, 2023',
      time: '10:15 AM',
      from: 'Central Hospital',
      to: '123 Main Street',
      driver: 'Jennifer L.',
      amount: '$32.75',
      status: 'completed'
    },
    {
      id: 'ride-003',
      date: 'Jul 28, 2023',
      time: '1:30 PM',
      from: '123 Main Street',
      to: 'Physical Therapy Center',
      driver: 'Robert K.',
      amount: '$28.90',
      status: 'completed'
    }
  ];
  
  const savedLocations = [
    {
      id: 'loc-001',
      name: 'Home',
      address: '123 Main Street, Anytown, USA 12345'
    },
    {
      id: 'loc-002',
      name: 'Medical Center',
      address: '789 Health Avenue, Anytown, USA 12345'
    },
    {
      id: 'loc-003',
      name: 'Physical Therapy',
      address: '456 Wellness Blvd, Anytown, USA 12345'
    }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = () => {
    setProfileData(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };
  
  const handleCancelEdit = () => {
    setFormData({ ...profileData });
    setIsEditing(false);
  };
  
  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center text-sm text-primary hover:text-primary/80"
          >
            <Edit2 size={16} className="mr-1" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveProfile}
              className="flex items-center text-sm text-primary hover:text-primary/80"
            >
              <Save size={16} className="mr-1" />
              Save Changes
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="bg-secondary/30 rounded-xl p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-primary/10">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{profileData.name}</h3>
            <p className="text-muted-foreground text-sm">Member since January 2023</p>
            
            <div className="w-full mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Rides</span>
                <span className="font-medium">27</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Favorite Driver</span>
                <span className="font-medium">Michael S.</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Status</span>
                <span className="text-primary font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="emergencyContact" className="text-sm font-medium">Emergency Contact</label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{profileData.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{profileData.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Emergency Contact</p>
                    <p className="font-medium">{profileData.emergencyContact}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Accessibility Preferences</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.preferredAccessibility.map((preference, index) => (
                  <div key={index} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium flex items-center">
                    <Accessibility size={14} className="mr-1" />
                    {preference}
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80"
              >
                Update Accessibility Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderRidesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Ride History</h2>
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80"
        >
          View All Rides
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentRides.map((ride) => (
                <tr key={ride.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{ride.date}</div>
                    <div className="text-xs text-muted-foreground">{ride.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{ride.from}</div>
                    <div className="text-xs text-muted-foreground">to {ride.to}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ride.driver}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{ride.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {ride.status === 'completed' ? 'Completed' : ride.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      type="button"
                      className="text-primary hover:text-primary/80"
                      onClick={() => toast.info(`Details for ride ${ride.id}`)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  const renderLocationsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Saved Locations</h2>
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80"
          onClick={() => toast.info('Add new location dialog would open here')}
        >
          Add New Location
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedLocations.map((location) => (
          <div 
            key={location.id}
            className="bg-white rounded-xl shadow-sm border border-border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <MapPin size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-sm text-muted-foreground">{location.address}</p>
              </div>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => toast.info(`Edit ${location.name} dialog would open here`)}
              >
                <Edit2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Bell size={18} className="mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">Ride Updates</p>
                  <p className="text-sm text-muted-foreground">Receive notifications about your ride status</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={true} className="sr-only peer" onChange={() => {}} />
                <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Bell size={18} className="mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">Promotions and Offers</p>
                  <p className="text-sm text-muted-foreground">Receive special offers and promotions</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={false} className="sr-only peer" onChange={() => {}} />
                <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Bell size={18} className="mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">Safety Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive notifications about safety features</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={true} className="sr-only peer" onChange={() => {}} />
                <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
          
          <div className="space-y-6">
            <div>
              <p className="font-medium mb-2">Change Password</p>
              <button 
                type="button" 
                className="px-4 py-2 bg-secondary hover:bg-secondary/70 rounded-lg text-sm transition-colors"
                onClick={() => toast.info('Change password dialog would open here')}
              >
                Update Password
              </button>
            </div>
            
            <div>
              <p className="font-medium mb-2">Two-Factor Authentication</p>
              <button 
                type="button" 
                className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg text-sm transition-colors"
                onClick={() => toast.info('Two-factor authentication setup would start here')}
              >
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          
          <div className="mb-4">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg mb-2">
              <div className="flex items-center">
                <div className="p-2 bg-white rounded-md mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="5" width="20" height="14" rx="2" fill="#1A56DB" />
                    <circle cx="16" cy="12" r="4" fill="#FCD34D" fillOpacity="0.8" />
                    <circle cx="10" cy="12" r="4" fill="#EC4899" fillOpacity="0.8" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 09/24</p>
                </div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
            </div>
            
            <button 
              type="button" 
              className="text-sm text-primary hover:text-primary/80"
              onClick={() => toast.info('Add payment method dialog would open here')}
            >
              Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatedTransition className="min-h-screen bg-secondary/20">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Account</h1>
          </div>
          
          {/* Tab Navigation */}
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-border p-1 flex flex-wrap">
            <button
              type="button"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={16} className="mr-2" />
              Profile
            </button>
            
            <button
              type="button"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'rides' ? 'bg-primary text-white' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setActiveTab('rides')}
            >
              <Clock size={16} className="mr-2" />
              Ride History
            </button>
            
            <button
              type="button"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'locations' ? 'bg-primary text-white' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setActiveTab('locations')}
            >
              <MapPin size={16} className="mr-2" />
              Saved Locations
            </button>
            
            <button
              type="button"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={16} className="mr-2" />
              Settings
            </button>
          </div>
          
          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'rides' && renderRidesTab()}
            {activeTab === 'locations' && renderLocationsTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </motion.div>
        </div>
      </main>
    </AnimatedTransition>
  );
};

export default Profile;
