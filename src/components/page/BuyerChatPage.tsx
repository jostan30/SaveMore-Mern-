import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import ChatComponent from '../personal/ChatComponent';

import { toast } from "@/hooks/use-toast";
//import { ToastAction } from "@radix-ui/react-toast";
import { fetchProducts } from "@/api/products-api";
// interface ChatParams {
//     productId: string;
//   }

  const BuyerChatPage: React.FC = () => {
    const { productId } = useParams();
    console.log("The product is in buyerPage and product id is",productId);
    
    const navigate = useNavigate();
  
    const { isLoggedIn, loading, userData } = useAuth({ userType: 'user' });
  console.log("The user data is",userData);
  
    const [ownerInfo, setOwnerInfo] = useState< string | null>(null);
    const [product, setProduct] = useState<any>(null); // for future use if needed
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        if (!productId) {
          toast({
            title: 'Error',
            description: 'Product information is missing',
            variant: 'destructive'
          });
          navigate('/');
          return;
        }
  
        try {
          const products = await fetchProducts(); // fetch all
          const matchedProduct = products.find((p: any) => p._id === productId);
          console.log("The matched product is",matchedProduct);
          
          if (matchedProduct) {
            setProduct(matchedProduct);
            setOwnerInfo( matchedProduct.owner );
          } else {
            throw new Error('Product not found');
          }

          console.log("The owner of product is",ownerInfo);
          
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to load product information',
            variant: 'destructive'
          });
          navigate('/');
        }
      };
  
      if (!loading && isLoggedIn) {
        fetchProductDetails();
      } else if (!loading && !isLoggedIn) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in to access chat',
          variant: 'destructive'
        });
        navigate('/owner/login');
      }
    }, [isLoggedIn, loading, productId, navigate]);
  
    if (loading || !userData || !ownerInfo) {
      console.log("User not logged in");
      
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">Log In First</div>
        </div>
      );
    }
  
  
    return (
      <ChatComponent
        roomId={ownerInfo} // Use owner._id as roomId
        userId={userData._id}
        userType="user"
        productId={productId}
      />
    );
  };

  export default BuyerChatPage;