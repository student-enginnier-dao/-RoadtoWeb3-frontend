import { useWeb3 } from "@/hooks/useWeb3";

export const HeaderAccount = () => {
  const { accounts, isInitializing } = useWeb3();
  const account = accounts[0];
  const accountName = account
    ? account.ethName || `${account.id.slice(0, 4)}...${account.id.slice(-3)}`
    : "0x00...000";
  return !isInitializing ? (
    <div className="flex gap-2 items-center bg-">
      <div
        className="w-10 h-10 bg-gray-300 rounded-full"
        style={{ backgroundImage: `url(${account && account.avatar})` }}
      ></div>
      <div className="text-xl font-bold text-white">{accountName}</div>
    </div>
  ) : (
    <div className="text-xl font-bold text-white">loading</div>
  );
};
