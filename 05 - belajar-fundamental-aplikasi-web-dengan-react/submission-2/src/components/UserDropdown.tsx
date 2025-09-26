import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import userAvatar from "../assets/user.png";
import { Archive, LogOut } from "react-feather";
import { useTranslate } from "../utils/hooks/useTranslate";

interface UserDropdownProps {
  onLogout: () => void;
}

const UserDropdown = ({ onLogout }: UserDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslate();

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
      ref={dropdownRef}
    >
      {/* Foto Profil sebagai toggle */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 overflow-hidden border-2 border-gray-300 rounded-full cursor-pointer hover:border-gray-400 focus:outline-none"
      >
        <img
          src={userAvatar}
          alt="User"
          className="object-cover w-full h-full"
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 w-40 mt-2 shadow-lg bg-secondary dark:bg-gray-800 top-10 rounded-xl ring-1 ring-black/5">
          <div className="py-2">
            <NavLink
              to="/app/archives"
              className="block px-4 py-2 text-sm text-primary dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-gray-900"
              onClick={() => setOpen(false)}
            >
              <Archive size={16} className="inline-block me-2" />
              <span>{t("archives")}</span>
            </NavLink>
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="block w-full px-4 py-2 text-sm text-left cursor-pointer text-primary dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-gray-900"
            >
              <LogOut size={16} className="inline-block me-2" />
              <span>{t("logout")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
