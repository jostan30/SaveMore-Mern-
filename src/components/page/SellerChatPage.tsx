import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ChatComponent from '../personal/ChatComponent';
import { toast } from "@/hooks/use-toast";

const SellerChatPage: React.FC = () => {
    const navigate = useNavigate();
    const authStatus =useAuth({userType:'owner'});
    const { isLoggedIn, loading, userData } = useAuth({ userType: 'owner' });
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
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    
      
    }
    console.log("The seller id and room id is",userData._id);
    return (
      <ChatComponent
        roomId={userData._id}
        userId={userData._id}
        userType="owner"
      />
    );
  };
  
  export default SellerChatPage;