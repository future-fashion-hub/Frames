//MainPage.tsx
import { useAppDispatch, useAppSelector } from "@/app/providers/StoreProvider/store";
import { logoutUser } from "@/features/auth/api/authThunks";
import { ThemeSwitcher } from "@/features/theme/ui/ThemeToggle/ThemeToggle";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);

  const handleLogout = () => {
    if (refreshToken) {
      dispatch(logoutUser({ refresh_token: refreshToken }));
    } else {
      console.error("Refresh token не найден, не могу выполнить выход.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <ThemeSwitcher/>
      <button 
        onClick={handleLogout}
        style={{ padding: '10px 15px', fontSize: '16px', cursor: 'pointer' }}
      >
        Выйти из аккаунта
      </button>
    </div>
  );
};