import { classNames } from "~/helpers/style-helpers";

type StatProps = React.PropsWithChildren<{
  onClick?: () => void;
}>;

export function Stat({ onClick, children }: StatProps) {
  return (
    <div
      className={classNames(
        "px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6",
        onClick && "hover:cursor-pointer"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
