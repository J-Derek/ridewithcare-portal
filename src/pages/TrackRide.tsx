
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { MapPin, Navigation, Phone, MessageSquare, Clock, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const TrackRide = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [progress, setProgress] = useState(30);
  const [arrivalTime, setArrivalTime] = useState('16:42');
  const [elapsedTime, setElapsedTime] = useState(7);
  const [tripStatus, setTripStatus] = useState('in-progress'); // 'waiting', 'in-progress', 'completed'
  
  // Simulate ride progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTripStatus('completed');
          toast.success('Your ride has been completed!');
          return 100;
        }
        return prev + 2;
      });
      setElapsedTime(prev => prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleEmergency = () => {
    toast.error('Emergency call initiated! Support will contact you immediately.');
  };
  
  const handleContactDriver = () => {
    toast.info('Connecting you with your driver...');
  };
  
  const handleMessageDriver = () => {
    toast.info('Message sent to your driver');
  };

  return (
    <AnimatedTransition className="min-h-screen bg-secondary/20">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Trip Status Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
            <div className="bg-primary text-white p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Ride is {tripStatus === 'waiting' ? 'Scheduled' : tripStatus === 'in-progress' ? 'In Progress' : 'Completed'}</h2>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {tripStatus === 'waiting' ? 'Upcoming' : tripStatus === 'in-progress' ? 'Active' : 'Completed'}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Trip Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              {/* Trip Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Clock size={16} className="text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Arrival Time</span>
                  </div>
                  <p className="text-lg font-semibold">{arrivalTime}</p>
                </div>
                
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Clock size={16} className="text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Elapsed Time</span>
                  </div>
                  <p className="text-lg font-semibold">{elapsedTime} min</p>
                </div>
                
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Navigation size={16} className="text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Distance</span>
                  </div>
                  <p className="text-lg font-semibold">3.2 miles</p>
                </div>
              </div>
              
              {/* Route Visualization */}
              <div className="mb-6 relative">
                <div className="h-60 bg-secondary/30 rounded-lg overflow-hidden">
                  {/* Map Placeholder - In a real app, you'd use a Google Maps or Mapbox component */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-4">
                      <Navigation size={28} className="mx-auto mb-2 text-primary" />
                      <p className="text-muted-foreground">Live tracking map would appear here</p>
                      <p className="text-xs text-muted-foreground mt-1">Driver is on Main St, 0.8 miles away</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Locations */}
              <div className="space-y-4 mb-6">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <MapPin size={16} />
                    </div>
                    <div className="w-0.5 h-12 bg-border mx-auto my-1" />
                    <div className="w-8 h-8 rounded-full bg-secondary text-foreground flex items-center justify-center">
                      <MapPin size={16} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">Pickup</p>
                      <p className="font-medium">123 Main Street, Anytown</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-medium">456 Central Avenue, Anytown</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Driver Card */}
          <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Driver</h3>
              
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                      alt="Driver" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">Michael Johnson</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">4.9 (320 rides)</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">Accessibility Trained</span>
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">5+ Years</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                <button 
                  type="button"
                  onClick={handleContactDriver}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/70 transition-colors"
                >
                  <Phone size={16} />
                  <span>Call</span>
                </button>
                
                <button 
                  type="button"
                  onClick={handleMessageDriver}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/70 transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>Message</span>
                </button>
                
                <button 
                  type="button"
                  onClick={handleEmergency}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-destructive/80 text-destructive-foreground rounded-lg hover:bg-destructive transition-colors col-span-2 sm:col-span-1"
                >
                  <AlertTriangle size={16} />
                  <span>Emergency</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Vehicle Info */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
              
              <div className="flex items-start">
                <div className="mr-4 w-24 h-24 bg-secondary/30 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Vehicle" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">Toyota Sienna Accessible Van</h4>
                  <p className="text-sm text-muted-foreground mt-1">License: ABC-1234</p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="flex items-center text-sm">
                      <Shield size={14} className="text-primary mr-1" />
                      <span>Side Entry Ramp</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Shield size={14} className="text-primary mr-1" />
                      <span>Q-Straint System</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Shield size={14} className="text-primary mr-1" />
                      <span>Lowered Floor</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Shield size={14} className="text-primary mr-1" />
                      <span>Extra Headroom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AnimatedTransition>
  );
};

export default TrackRide;
