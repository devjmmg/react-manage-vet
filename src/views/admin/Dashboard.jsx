import useAuth from "../../hooks/useAuth"

export default function Dashboard() {

    const { auth } = useAuth();
    console.log(auth);

    return (
        <div>Dashboard</div>
    )
}
