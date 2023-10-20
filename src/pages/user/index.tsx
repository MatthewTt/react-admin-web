import {Button, Col, Form, FormInstance, Input, Modal, Row, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useRef, useState} from "react";
import UserEdit from "@/pages/user/userEdit.tsx";
import {useAntdTable, useRequest} from "ahooks";
import userService, {User} from "@/pages/user/service.ts";


type UserPageProps = {
    id: string,
    userName: string,
    nickName: string,
    mobile: string,
    email: string,
}
const UserPage = () => {

    const columns: ColumnsType<UserPageProps> = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        setEditData(record)
                        setFormOpen(true)
                    }}>编辑</a>
                    <a onClick={async () => {
                        await deleteUser(record.id)
                        submit()
                    }}>删除</a>
                </Space>
            ),
        },
    ];


    const onFinish = () => {

    }

    const [form] = Form.useForm();
    const [editData, setEditData] = useState<User | null>(null);
    const [formOpen, setFormOpen] = useState(false)
    const formRef = useRef<FormInstance>(null);
    const {tableProps, search: {submit, reset}} = useAntdTable(userService.getUserListByPage, {form})
    const {runAsync: deleteUser} = useRequest(userService.deleteUser, {manual: true});

    const onSave = () => {
        setFormOpen(false)
        submit()
    }
    return (
        <>
            <Form
                {...{labelCol: {span: 6}, wrapperCol: {span: 14}}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                layout='horizontal'
                className='p4 rounded-lg bg-white'
                form={form}
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label="昵称" name='nickname'>
                            <Input placeholder="input placeholder"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="手机号" name='mobile'>
                            <Input placeholder="input placeholder"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Space>
                            <Button type="primary" onClick={submit}>搜索</Button>
                            <Button onClick={reset}>清除</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
            <div className="mt-4 bg-white rounded-lg px-3">
                <div className="p-4">
                    <Button type={"primary"} onClick={() => {
                        setFormOpen(true)
                        setEditData(null)
                    }}>新增</Button>
                </div>
                <Table columns={columns} {...tableProps} />
            </div>

            <Modal
                title='新建'
                open={formOpen}
                destroyOnClose
                onCancel={() => setFormOpen(false)}
                onOk={async () => {
                    formRef.current?.submit()
                }}
            >
                <UserEdit ref={formRef} onSave={onSave} editData={editData}/>
            </Modal>
        </>
    )
}

export default UserPage
