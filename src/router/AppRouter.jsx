import { Routes, Route } from "react-router-dom";
import { LoginPages } from "../auth";
import { CalendarPages } from "../calendar";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
    


    const { status, checkAuthToken } = useAuthStore();
    // const authStatus = "no-authenticated"; //"authenticated";

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === "checking") {
        return <h3>Cargando ...</h3>;
    }

    return (
        <Routes>
            {status === "not-authenticated" ? (
                <>
                    <Route path="/auth/*" element={<LoginPages />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<CalendarPages />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
};
