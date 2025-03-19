
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import VehicleSelector from '@/components/ride/VehicleSelector';
import AccessibilityOptions from '@/components/ride/AccessibilityOptions';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { MapPin, Calendar, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

interface BookingStep {
  id: string;
  title: string;
  description: string;
}

const BookRide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    notes: ''
  });
  
  const steps: BookingStep[] = [
    {
      id: 'location',
      title: 'Trip Details',
      description: 'Enter your pickup and drop-off locations'
    },
    {
      id: 'accessibility',
      title: 'Accessibility Needs',
      description: 'Let us know your specific accessibility requirements'
    },
    {
      id: 'vehicle',
      title: 'Vehicle Selection',
      description: 'Choose the vehicle type that suits your needs'
    },
    {
      id: 'review',
      title: 'Review & Confirm',
      description: 'Verify your ride details before booking'
    }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAccessibilityOptionsChange = (options: string[]) => {
    setSelectedOptions(options);
  };
  
  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
  };
  
  const goToNextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 0) {
      // Validate location step
      if (!bookingDetails.pickup || !bookingDetails.destination) {
        toast.error('Please enter both pickup and destination locations');
        return;
      }
      if (!bookingDetails.date || !bookingDetails.time) {
        toast.error('Please select date and time for your ride');
        return;
      }
    } else if (currentStep === 1) {
      // Validate accessibility step
      if (selectedOptions.length === 0) {
        toast.error('Please select at least one accessibility option');
        return;
      }
    } else if (currentStep === 2) {
      // Validate vehicle step
      if (!selectedVehicle) {
        toast.error('Please select a vehicle type');
        return;
      }
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleBookingSubmit = () => {
    toast.success('Your ride has been booked successfully!');
    
    // In a real app, you would call an API to create the booking
    setTimeout(() => {
      // Redirect to a confirmation page or tracking page
      console.log('Booking details:', {
        ...bookingDetails,
        accessibilityOptions: selectedOptions,
        vehicleType: selectedVehicle
      });
    }, 1500);
  };
  
  // Helper to get vehicle name from ID
  const getVehicleName = (id: string) => {
    const vehicles: Record<string, string> = {
      'standard-accessible': 'Standard Accessible',
      'premium-accessible': 'Premium Accessible',
      'group-accessible': 'Group Accessible'
    };
    return vehicles[id] || 'Unknown';
  };
  
  // Helper to get accessibility option name from ID
  const getOptionName = (id: string) => {
    const options: Record<string, string> = {
      'wheelchair': 'Wheelchair Access',
      'mobility': 'Mobility Assistance',
      'visual': 'Visual Impairment',
      'audio': 'Hearing Assistance',
      'quick': 'Minimized Wait Time'
    };
    return options[id] || 'Unknown';
  };

  return (
    <AnimatedTransition className="min-h-screen bg-secondary/20">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between w-full mb-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <div 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                        ${index < currentStep 
                          ? 'bg-primary text-white' 
                          : index === currentStep 
                            ? 'bg-primary text-white ring-4 ring-primary/20' 
                            : 'bg-secondary text-muted-foreground'}
                      `}
                    >
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <div className="text-sm font-medium mt-2 text-center hidden sm:block">
                      {step.title}
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="w-full h-1 bg-secondary mx-2">
                      <div 
                        className="h-full bg-primary transition-all duration-300" 
                        style={{ 
                          width: index < currentStep ? '100%' : '0%' 
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Step Title (Mobile) */}
            <div className="text-center sm:hidden">
              <h3 className="text-lg font-medium">{steps[currentStep].title}</h3>
              <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
            </div>
          </div>
          
          {/* Form Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            {/* Step 1: Location */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-semibold hidden sm:block">Trip Details</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="pickup" className="text-sm font-medium">Pickup Location</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        id="pickup"
                        name="pickup"
                        value={bookingDetails.pickup}
                        onChange={handleInputChange}
                        placeholder="Enter pickup address"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="destination" className="text-sm font-medium">Destination</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={bookingDetails.destination}
                        onChange={handleInputChange}
                        placeholder="Enter destination address"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">Date</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={bookingDetails.date}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="time" className="text-sm font-medium">Time</label>
                      <div className="relative">
                        <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={bookingDetails.time}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">Special Instructions (Optional)</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={bookingDetails.notes}
                      onChange={handleInputChange}
                      placeholder="Any additional information that might help your driver"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Accessibility Requirements */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-semibold hidden sm:block">Accessibility Requirements</h2>
                </div>
                
                <AccessibilityOptions onOptionsChange={handleAccessibilityOptionsChange} />
              </div>
            )}
            
            {/* Step 3: Vehicle Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-semibold hidden sm:block">Vehicle Selection</h2>
                </div>
                
                <VehicleSelector onVehicleSelect={handleVehicleSelect} />
              </div>
            )}
            
            {/* Step 4: Review & Confirm */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-semibold hidden sm:block">Review & Confirm</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Trip Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Pickup Location</p>
                        <p className="font-medium">{bookingDetails.pickup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Destination</p>
                        <p className="font-medium">{bookingDetails.destination}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{bookingDetails.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{bookingDetails.time}</p>
                      </div>
                    </div>
                    {bookingDetails.notes && (
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground">Special Instructions</p>
                        <p>{bookingDetails.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Accessibility Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedOptions.map(option => (
                        <span key={option} className="accessibility-chip">
                          {getOptionName(option)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Vehicle Type</h3>
                    <p>{getVehicleName(selectedVehicle)}</p>
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <h3 className="font-medium text-primary mb-2">Estimated Fare</h3>
                    <p className="text-2xl font-bold">$35.00 - $45.00</p>
                    <p className="text-sm text-muted-foreground mt-1">Final fare may vary based on traffic and actual distance</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="flex items-center px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft size={20} className="mr-1" />
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="btn-primary flex items-center"
                >
                  Next
                  <ChevronRight size={20} className="ml-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBookingSubmit}
                  className="btn-primary flex items-center"
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </AnimatedTransition>
  );
};

export default BookRide;
