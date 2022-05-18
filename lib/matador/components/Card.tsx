type CardProps = React.PropsWithChildren<{
  title?: string | React.ReactNode;
}>;

export function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg h-full">
      {title &&
        (typeof title === "string" ? (
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {title}
            </h3>
          </div>
        ) : (
          title
        ))}
      <div className="px-4 py-4 sm:px-6">{children}</div>
    </div>
  );
}
