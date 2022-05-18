type IndexProps = {};

export default function Index({}: IndexProps) {
  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Matador
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <p>
            A bold interface to monitor
            <a href="https://docs.bullmq.io/what-is-bullmq"> BullMQ </a>
            queues in your application
          </p>
        </div>
      </main>
    </>
  );
}
