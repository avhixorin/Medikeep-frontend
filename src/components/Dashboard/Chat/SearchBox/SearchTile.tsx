type SearchTileProps = {
  profileImage: string;
  username: string;
  role: string;
  onConnect: () => void;
  isDisabled: boolean;
  connectState: "idle" | "connecting" | "sent";
};

const SearchTile: React.FC<SearchTileProps> = ({
  profileImage,
  username,
  role,
  onConnect,
  isDisabled,
  connectState,
}) => {
  return (
    <div className="w-full flex items-center gap-4 py-3 px-4 bg-white/20 backdrop-blur-md dark:bg-transparent transform transition-transform duration-200 hover:scale-[1.02] border-b border-black/30 dark:border-white/30 text-zinc-700 cursor-pointer hover:bg-white/50 dark:hover:bg-black/10 hover:border-l-2 hover:border-black/20 hover:dark:border-white/20">
      <img
        src={profileImage}
        alt={`${username}'s profile`}
        className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-700"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{username}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>

      <button
        onClick={onConnect}
        disabled={isDisabled}
        className={`px-4 py-2 rounded-lg shadow transition-all ${
          connectState === "connecting"
            ? "bg-yellow-500 text-white"
            : connectState === "sent"
            ? "bg-green-500 text-white"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {connectState === "connecting" ? "Connecting..." : connectState === "sent" ? "Sent" : "Connect"}
      </button>
    </div>
  );
};

export default SearchTile;
