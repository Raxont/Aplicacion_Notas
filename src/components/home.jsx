import Logout from "./logout";

const NotesEmptyState = () => {
    return (
      <div className="w-[100%] p-4 h-screen bg-background-1 relative">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-white text-4xl font-semibold">Notas</h1>
          <div className="flex gap-1">
            <button className="p-2 rounded-2xl hover:bg-button-1">
              <img src="/public/img/search.png" alt="Buscar notas" class="w-[2rem]" />
            </button>
            <button className="p-2 rounded-2xl hover:bg-button-1">
              <img src="/public/img/info_outline.png" alt="Buscar notas" class="w-[2rem]" />
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
        <button className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
          <img src="/public/img/add.png" alt="Agregar notas" />
        </button>
      </div>
    );
  };
  
  export default NotesEmptyState;