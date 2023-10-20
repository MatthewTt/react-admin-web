import {Button, Result} from 'antd';
import {Link} from 'react-router-dom';

const Result404 = () => (
    <Result
        status="404"
        title="404"
        subTitle="对不起，你访问的页面不存在。"
        extra={(
            <Link to="/">
                <Button type="primary">
                    首页
                </Button>
            </Link>
        )}
    />
);

export default Result404;