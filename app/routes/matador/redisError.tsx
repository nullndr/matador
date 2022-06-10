export default function RedisError() {
  return (
    <>
      <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <div className="sm:ml-6">
              <div className="sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Redis Connection Error!
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please check the Redis connection and try again.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
