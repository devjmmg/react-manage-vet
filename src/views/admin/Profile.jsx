import useAuth from '../../hooks/useAuth';

export default function Profile() {

    const { auth } = useAuth();

    console.log(auth, 2+2);

    return (
        <div>Profile</div>
    )
}
