import { ApiManager, getUser } from "../utils";

const apiManager = new ApiManager();

export function profileLoader() {
    return getUser();
}

export function Profile() {
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}
