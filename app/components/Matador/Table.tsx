type TableProps = React.PropsWithChildren<{
  headers: string[];
}>;

export function Table({ headers, children }: TableProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded-lg overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky">
                <tr>
                  {headers.map((header) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                      key={header}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
