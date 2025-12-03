import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function NotFound() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>404 Not Found</h1>
            <Button colorPalette="teal" variant="solid" onClick={() => navigate('/')} >Back to Home</Button>

        </div>
    );
}
export default NotFound
