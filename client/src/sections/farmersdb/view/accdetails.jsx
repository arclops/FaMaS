import { apiFetch } from '../../../api/client';

export default async function getdetails (userid) {
    const response = await apiFetch(`/api/admin/getdets/${userid}`, {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    const newdata = {...data.data, photoURL: '/assets/images/avatars/avatar_9.jpg'};
    return newdata;
}