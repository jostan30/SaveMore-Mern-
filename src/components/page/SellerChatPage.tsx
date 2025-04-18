import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ChatComponent from '../personal/ChatComponent';
import { toast } from "@/hooks/use-toast";

const SellerChatPage: React.FC = () => {
    const navigate = useNavigate();
    const authStatus =useAuth();
    const { isLoggedIn, loading, userData ,userRole } = useAuth();
    console.log("The authstatus in seller is",authStatus);
    
    React.useEffect(() => {
      // Check if owner is logged in
      if (!loading && !isLoggedIn) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in as a seller to access chat',
          variant: 'destructive'
        });
        navigate('/owners/login');
      }
    }, [isLoggedIn, loading, navigate, toast]);
    
    if (loading || !userData) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      );
    
      
    }
    console.log("The seller id and room id is",userData._id);
    return (
      <ChatComponent
        roomId={userData._id}
        userId={userData._id}
        userType= {userRole}
      />
    );
  };
  
  export default SellerChatPage;