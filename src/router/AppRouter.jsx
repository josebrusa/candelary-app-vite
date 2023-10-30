import { Routes, Route } from "react-router-dom";
import { LoginPages } from "../auth";
import { CalendarPages } from "../calendar";
import { Navigate } from "react-router-dom";

export const AppRouter = () => {
    const authStatus = "authenticated"; //"no-authenticated";

    return (
        <Routes>
            {authStatus === "no-authenticated" ? (
                <Route path="/auth/*" element={<LoginPages />} />
            ) : (
                <Route path="/*" element={<CalendarPages />} />
            )}

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
