import {Button} from "antd";
import {Link} from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to={'/123'}>
                <Button type="primary">Button</Button>
            </Link>
        </div>
    )
}

export default Dashboard