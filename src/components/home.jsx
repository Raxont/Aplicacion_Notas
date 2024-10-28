import Logout from "./logout";

const NotesEmptyState = () => {
    return (
      <div className="min-h-screen bg-gray-900 p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-semibold">Notes</h1>
          <div className="flex gap-3">
            <button className="p-2 rounded-full hover:bg-gray-800">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-800">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <Logout />
          </div>
        </header>
  
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="relative w-64 h-64 mb-6">
            {/* Pencil */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <div className="w-8 h-48 bg-gray-400 transform -rotate-12"></div>
              <div className="w-8 h-8 bg-gray-300 transform -rotate-12 -mt-1"></div>
            </div>
            
            {/* Note Paper */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-40 h-56 bg-gray-100 rounded-sm transform rotate-12 p-4">
                <div className="space-y-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-1 bg-gray-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Character */}
            <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
              <div className="w-12 h-24 relative">
                <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
                <div className="w-12 h-12 bg-gray-400"></div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 text-lg">Create your first note!</p>
        </div>
  
        {/* FAB */}
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    );
  };
  
  export default NotesEmptyState;