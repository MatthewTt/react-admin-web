import axios from "axios";
import request from "@/utils/request";

export interface User {
    id: string;
    userName: string;
    nickName: string;
    mobile: string;
    email: string;
}
export interface PageData {
    data: User[],
    total: number;
}

axios.defaults.baseURL = '/api'
const userService = {
    getUserListByPage: async ({current, pageSize}: { current: number, pageSize: number }, formData: any) =>
    {
        const { data }= await request.get<PageData>('/user/page', {
            params: {
                page: current,
                size: pageSize,
                ...formData,
            }
        });

        return {
            list: data.data,
            total: data.total
        };
    },
    addUser: (data: User) => {
        return request.post('/user', data)
    },
    editUser: (data: User) => {
        return request.put('/user', data)
    },
    deleteUser: (id: string) => {
        return request.delete(`/user/${id}`)
    },

    getUserById: () => {
        return request.get<User>(`/user/current/uesr`)
    }
}

export default userService
