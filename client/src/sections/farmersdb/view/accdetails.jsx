export default async function getdetails (userid) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/getdets/${userid}`, {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    const newdata = {...data.data, photoURL: '/assets/images/avatars/avatar_9.jpg'};
    return newdata;
}