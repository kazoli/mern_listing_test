import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  useEffect(() => {
    // set page title
    document.title = "404 - Not found";
  }, []);

  return (
    <div>
      <h1>Requested page is not found!</h1>
      <Link to="/" className="link">Go back to main page</Link>
    </div>
  );
};

export default NotFound;
