import { useLocation } from "react-router";
interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  ShopName: string;
  Address: string;
  description: string;
  units:number;
  image: string; // Base64 string
}
function Cart() {
  const location = useLocation();
  const cartProduct = location.state?.cartProduct || []; // Get the cart products from location state

  return (
    <div className="max-h-full max-w-screen h-screen w-screen flex md:flex-row flex-col">
      <div className=" flex-1 flex-col h-screen w-full md:w-[70%]">
        {/* Address */}
        <div className="h-[10%] bg-red-100 p-4">Address</div>

        {/* Cart Products */}
        <div className="flex-1 justify-center p-4">
          {cartProduct.length > 0 ? (
            cartProduct.map((product: Product) => (
              
              <div key={product._id} className="flex justify-between items-center p-4 border-b border-gray-300">
                <div className="flex items-center space-x-4">
                  <img
                    src={`data:image/png;base64,${product.image}`}
                    alt={product.name}
                    className="md:w-60 md:h-60 h-40 w-40 object-cover rounded-lg shadow-md border border-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price: ${product.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.units}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl">Your cart is empty!</p>
          )}
        </div>
      </div>

      <div className="bg-red-200 h-screen w-full md:w-[30%] p-4">
        {/* Checkout Product */}
        <div>
          <h2 className="text-xl font-semibold">Checkout</h2>
          {/* Add your checkout details and buttons here */}
        </div>
      </div>
    </div>
  );
}

export default Cart;
