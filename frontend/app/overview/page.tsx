export default function Overview() {
    return (
        <main>
            <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="card-one p-8 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg">
                    <h4 className="text-[13px] mb-2">Total no of tasks</h4>
                    <p className="text-xl font-medium">500</p>
                </div>
                <div className="card-one p-8 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg">
                    <h4 className="text-[13px] mb-2">Open</h4>
                    <p className="text-xl font-medium">20</p>
                </div>
                <div className="card-one p-8 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg">
                    <h4 className="text-[13px] mb-2">In progress</h4>
                    <p className="text-xl font-medium">20</p>
                </div>
                <div className="card-one p-8 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg">
                    <h4 className="text-[13px] mb-2">Completed</h4>
                    <p className="text-xl font-medium">20</p>
                </div>
                <div className="card-one p-8 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg">
                    <h4 className="text-[13px] mb-2">On hold</h4>
                    <p className="text-xl font-medium">20</p>
                </div>
            </div>
        </main>
    );
}
