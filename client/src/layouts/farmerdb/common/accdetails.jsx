import { apiFetch } from '../../../api/client';

export default async function getdetails () {
    const userid = localStorage.getItem('uid');
    const response = await apiFetch(`/api/admin/getdets/${userid}`, {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    const newdata = {...data.data, photoURL: '/assets/images/avatars/avatar_25.jpg'};
    return newdata;
}