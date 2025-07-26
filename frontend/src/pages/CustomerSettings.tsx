import MenuBar from "@/components/menu-bar";
import { clearSession, generateUserPhoto, getSession } from "@/lib/utils";

export default function CustomerSettings() {
  const user = getSession();

  const handleLogout = () => {
    clearSession();

    window.location.replace("/login");
  };
  return (
    <div
      id="Content-Container"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
      <div className="flex items-center justify-between px-5 mt-[60px]">
        <h1 className="font-bold text-[26px] leading-[39px]">Settings</h1>
      </div>
      <div className="flex flex-col gap-[30px] px-5 mt-10">
        <div className="flex flex-col items-center gap-[14px] w-fit mx-auto">
          <div className="flex w-[120px] h-[120px] shrink-0 rounded-full overflow-hidden">
            <img
              src={generateUserPhoto(user?.name)}
              className="w-full h-full object-cover"
              alt="photo2"
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="font-semibold text-xl leading-[30px] text-center">
              {user?.name}
            </p>
            <p className="text-sm text-premiere-grey">{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex w-12 h-12 shrink-0 rounded-full overflow-hidden bg-white/10">
                <img
                  src="assets/images/icons/user-octagon.svg"
                  className="w-[22px] h-[22px] m-auto"
                  alt="icon"
                />
              </div>
              <p>Edit My Profile</p>
            </div>
            <span className="rounded-full p-[6px_16px] bg-white font-bold text-premiere-black">
              Edit
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex w-12 h-12 shrink-0 rounded-full overflow-hidden bg-white/10">
                <img
                  src="assets/images/icons/like.svg"
                  className="w-[22px] h-[22px] m-auto"
                  alt="icon"
                />
              </div>
              <p>Special Rewards</p>
            </div>
            <span className="rounded-full p-[6px_16px] bg-white font-bold text-premiere-black">
              Details
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex w-12 h-12 shrink-0 rounded-full overflow-hidden bg-white/10">
                <img
                  src="assets/images/icons/24-support.svg"
                  className="w-[22px] h-[22px] m-auto"
                  alt="icon"
                />
              </div>
              <p>Help Center</p>
            </div>
            <span className="rounded-full p-[6px_16px] bg-white font-bold text-premiere-black">
              View All
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex w-12 h-12 shrink-0 rounded-full overflow-hidden bg-white/10">
                <img
                  src="assets/images/icons/cards.svg"
                  className="w-[22px] h-[22px] m-auto"
                  alt="icon"
                />
              </div>
              <p>E-Wallet Settings</p>
            </div>
            <span className="rounded-full p-[6px_16px] bg-white font-bold text-premiere-black">
              Manage
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-full p-[12px_18px] bg-white/10 font-bold text-center backdrop-blur-sm">
            Logout My Account
          </button>
        </div>
      </div>
      <MenuBar activeLink="settings" />
    </div>
  );
}
