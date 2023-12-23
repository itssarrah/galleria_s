const Elevated = ({ children }) => (
  <div className="rounded-xl bg-[#F5EBE0] shadow-lg my-2">
    <div className="flex items-center gap-5 justify-start px-5 py-2">
      {children}
    </div>
  </div>
);

export default Elevated;