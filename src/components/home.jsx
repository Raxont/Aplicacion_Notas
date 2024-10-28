import Logout from "./logout";

const NotesEmptyState = () => {
    return (
      <div className="w-[100%] p-6 h-screen">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-semibold">Notas</h1>
          <div className="flex gap-3">
            <button className="p-2 rounded-full hover:bg-button-1">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-button-1">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <Logout />
          </div>
        </header>
  
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <img src="/public/img/rafiki.png" alt="Sin notas" />
          
          <p className="text-gray-400 text-2xl pt-2">Crea su primera nota!</p>
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