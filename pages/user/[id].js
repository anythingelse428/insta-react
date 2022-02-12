import Api from "../../api";
import UserBar from "../../components/UserBar";
import UserCard from "../../components/UserCard";

export default function User({ user }) {
    return (
        <div className="container">
                <UserCard id={user.id} />
                <UserBar id={user.id} />
        </div>
    )
}

export async function getServerSideProps ({ params }) {

    let response = Api.GetUserById(params.id).then(({ data }) => response = data)
    const user = await response
    return {
        props: { user }
    }
}