const AdminFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-6 text-center shadow-inner text-sm text-gray-500 hover:text-gray-700 transition-all duration-300">
      <div className="flex justify-center items-center gap-2">
        <span className="text-blue-600 font-semibold">Visoka Welfare Foundation</span>
        <span className="text-xs">| Admin Panel © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default AdminFooter;


