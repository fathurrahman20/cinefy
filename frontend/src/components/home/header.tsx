import { generateUserPhoto, getSession } from "@/lib/utils";

export default function Header() {
  const session = getSession();
  if (!session) return null;

  return (
    <div
      id="Header"
      className="flex items-center justify-between px-5 mt-[60px]">
      <div className="flex items-center gap-[14px] mr-3">
        {session && (
          <div className="w-[60px] h-[60px] flex shrink-0 rounded-full overflow-hidden">
            <img
              src={generateUserPhoto(session?.name)}
              className="w-full h-full object-cover"
              alt="avatar"
            />
          </div>
        )}
        <div>
          <p className="text-sm">Howdy,</p>
          <p className="font-semibold">{session?.name}</p>
        </div>
      </div>
      <button type="button">
        <img
          src="/assets/images/icons/notification-bell.svg"
          className="w-12 h-12 flex shrink-0"
          alt="icon"
        />
      </button>
    </div>
  );
}
