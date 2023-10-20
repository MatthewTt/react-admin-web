import {Form, Input, Radio} from "antd";
import {forwardRef, useImperativeHandle} from "react";
import {useRequest} from "ahooks";
import userService, {User} from "@/pages/user/service.ts";

interface PropsType {
    onSave: () => void
    editData?: any
}

const UserEdit = forwardRef(({onSave, editData}: PropsType, ref) => {
    const [form] = Form.useForm();
    const { runAsync: addUser} = useRequest(userService.addUser, { manual: true});
    const { runAsync: editUser} = useRequest(userService.editUser, { manual: true});
    const finishHandle = async (values: User) => {
        if (editData) {
            await editUser({ ...editData, ...values})
            onSave()
            return
        }
        await addUser(values)
        onSave()
    }

    useImperativeHandle(ref, () => form, [form])
    return (
        <Form
            labelCol={{sm: {span: 24}, md: {span: 5}}}
            wrapperCol={{sm: {span: 24}, md: {span: 16}}}
            onFinish={finishHandle}
            form={form}
            initialValues={editData}
        >
            <Form.Item label="用户名" name="userName" rules={[{
                required: true,
                message: '请输入用户名'
            }]}>
                <Input/>
            </Form.Item>
            <Form.Item label="昵称" name="nickName" rules={[{required: true, message: '请输入昵称'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="手机号" name="mobile" rules={[{ required: true, message: '请输入手机号'}, { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={[{required: true, message: '请输入邮箱'}, { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱' }]}>
                <Input/>
            </Form.Item>
            <Form.Item label='性别' name="sex" rules={[{ required: true, message: '请选择性别'}]}>
                <Radio.Group>
                    <Radio value={1}>男</Radio>
                    <Radio value={0}>女</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
})

export default UserEdit