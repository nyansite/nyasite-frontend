import Cookies from 'universal-cookie';
const cookies = new Cookies();
async function getdata() {
    // console.log(w)
    const res = await fetch(`localhost:8000/user_status`)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export default function login() {
    console.log(getAuthToken())
    
    return (
        <form>

        </form>
    )
}
export const getAuthToken = () => {
    if (cookies.get('token') === undefined) {
        return '1';
    }
    return cookies.get('token');
};