import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return( 
        <div id="error-page">
            <h1>Idiot</h1>
            <p>There was an error</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}