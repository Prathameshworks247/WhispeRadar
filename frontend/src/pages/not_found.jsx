import  Button  from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-factcheck-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-factcheck-red mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-factcheck-red hover:bg-factcheck-red-dark text-white px-8 py-3"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
