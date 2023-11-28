export default async function getdetails () {
    const userid = localStorage.getItem('uid');
    const response = await fetch(`http://localhost:5000/api/admin/getdets/${userid}`, {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    const newdata = {...data.data, photoURL: '/assets/images/avatars/avatar_9.jpg'};
    return newdata;
}