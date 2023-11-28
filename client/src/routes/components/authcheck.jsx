// export default async function AuthCheck() {
//         try{
//           const response = await fetch(`http://localhost:5000/api/auth/getrole`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             "Content-Type": "application/json",
//           }
//         });
//         if( response.status === 200) {
//           const responsejson = await response.json();
//           const role = localStorage.getItem('role');
//           const uid = localStorage.getItem('uid');
//           if((role === 'guest' && uid === null) || (responsejson.role !== role) || (responsejson.uid !== uid)) {
//             return false;
//           }
//           return true;
//         }
//         } catch(error) {
//           console.log(error);
//           throw new Error(error.message);
//         }
// };

