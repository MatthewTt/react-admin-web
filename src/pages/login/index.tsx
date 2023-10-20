import {Button, Form, Input, message} from "antd";
import {LockOutlined, SafetyCertificateOutlined, UserOutlined} from "@ant-design/icons";
import {useRequest} from "ahooks";
import {ILogin, loginServices} from "@/pages/login/service.ts";
import {useGlobalStore} from "@/stores/globalStore.ts";
import {useNavigate} from "react-router-dom";
import {JSEncrypt} from "jsencrypt";

const Login = () => {
    const [form] = Form.useForm()
    const {data: captchaData, refresh: refreshCaptcha} = useRequest(loginServices.getCaptcha);
    const {runAsync: login, loading} = useRequest(loginServices.login, {manual: true});
    const { setToken, setRefreshToken } = useGlobalStore();
    const navigate = useNavigate();
    const onFinish = async (values: ILogin) => {
        if (!captchaData?.data) {
            return
        }

        const {data: publicKey} = await loginServices.getPublicKey()

        // 使用公钥加密密码
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        const password = encrypt.encrypt(values.password);

        if (!password) {
            return
        }

        values.password = password;
        values.publicKey = publicKey;

        try {
            values.captchaId = captchaData.data.id;
            const {data} = await login(values)
            setToken(data.token)
            setRefreshToken(data.refreshToken)

            navigate('/')
        } catch (e: any) {
            message.error(e.response.data.message)
            refreshCaptcha()
        }
    }
    return (
        <div className='flex items-center justify-center h-screen bg-gray-1'>
            <Form
                name="normal_login"
                className="w-sm"
                initialValues={{remember: true}}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="accountNumber"
                    rules={[{required: true, message: '请输入!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: '请输入密码!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item name='captchaCode' rules={[{ required: true, message: '请输入验证码'}]}>
                    <Input prefix={<SafetyCertificateOutlined/>} placeholder='请输入验证码'
                           suffix={<img src={captchaData?.data?.imageBase64} onClick={refreshCaptcha}/>}></Input>
                </Form.Item>

                <Form.Item className='text-center'>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;
