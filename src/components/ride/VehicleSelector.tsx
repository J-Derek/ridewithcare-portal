
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Car, MinusCircle, PlusCircle, Users, Clock, Accessibility } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  eta: string;
  capacity: number;
  features: string[];
}

interface VehicleSelectorProps {
  onVehicleSelect: (vehicleId: string) => void;
}

const VehicleSelector = ({ onVehicleSelect }: VehicleSelectorProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);

  const vehicles: Vehicle[] = [
    {
      id: 'standard-accessible',
      name: 'Standard Accessible',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Accessible vehicle with ramp and secure wheelchair fastening',
      price: 25,
      eta: '3-5',
      capacity: 1,
      features: ['Wheelchair Ramp', 'Secure Fastening', 'Extra Space']
    },
    {
      id: 'premium-accessible',
      name: 'Premium Accessible',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Luxury accessible vehicle with advanced features and extra space',
      price: 35,
      eta: '4-6',
      capacity: 2,
      features: ['Wheelchair Lift', 'Climate Control', 'Extra Comfortable Seats', 'Privacy Windows']
    },
    {
      id: 'group-accessible',
      name: 'Group Accessible',
      image: 'https://images.unsplash.com/photo-1548199569-31d7ee005c0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Spacious van that accommodates multiple wheelchairs and passengers',
      price: 45,
      eta: '5-8',
      capacity: 3,
      features: ['Multiple Wheelchair Spaces', 'Group Seating', 'Extended Headroom', 'Luggage Space']
    }
  ];

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    onVehicleSelect(vehicleId);
  };

  const toggleExpand = (vehicleId: string) => {
    setExpandedVehicle(expandedVehicle === vehicleId ? null : vehicleId);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Select Vehicle Type</h2>
        <p className="text-muted-foreground">Choose the vehicle that best fits your needs</p>
      </div>
      
      <div className="space-y-4 mt-4">
        {vehicles.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: vehicles.findIndex(v => v.id === vehicle.id) * 0.1
            }}
            className={cn(
              "border rounded-xl overflow-hidden transition-all duration-300",
              selectedVehicle === vehicle.id 
                ? "border-primary shadow-md" 
                : "border-border hover:border-primary/30"
            )}
          >
            <div 
              className={cn(
                "flex flex-col sm:flex-row cursor-pointer",
                expandedVehicle === vehicle.id ? "rounded-b-none" : ""
              )}
            >
              <div className="sm:w-1/3 relative overflow-hidden aspect-video sm:aspect-square">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:bg-none pointer-events-none" />
              </div>
              
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                    {selectedVehicle === vehicle.id && (
                      <CheckCircle2 className="text-primary" size={20} />
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mt-1">{vehicle.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mt-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={16} className="mr-1" />
                      <span>{vehicle.eta} min</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Accessibility size={16} className="mr-1" />
                      <span>Accessible</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users size={16} className="mr-1" />
                      <span>{vehicle.capacity} wheelchair{vehicle.capacity > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-lg font-semibold">${vehicle.price}</div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => toggleExpand(vehicle.id)}
                      className="text-sm text-primary flex items-center focus:outline-none"
                    >
                      {expandedVehicle === vehicle.id ? (
                        <>
                          <MinusCircle size={16} className="mr-1" />
                          <span>Less</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle size={16} className="mr-1" />
                          <span>Details</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleVehicleSelect(vehicle.id)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                        selectedVehicle === vehicle.id
                          ? "bg-primary text-white"
                          : "bg-secondary hover:bg-primary/10"
                      )}
                    >
                      {selectedVehicle === vehicle.id ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {expandedVehicle === vehicle.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border overflow-hidden"
                >
                  <div className="p-4 bg-muted/30">
                    <h4 className="font-medium mb-2">Features:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                      {vehicle.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm py-1">
                          <CheckCircle2 size={14} className="text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VehicleSelector;
