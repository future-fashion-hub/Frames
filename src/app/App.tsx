import { Login } from "@/pages/login/ui/LoginPage";
import { Register } from "@/pages/register/ui/RegisterPage";
import { MainPage } from "@/pages/home/MainPage"; 
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/providers/StoreProvider/store";

export const App = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};