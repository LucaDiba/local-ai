import { Chat } from "./components/Chat";

function App() {
  return (
    <>
      <div className="grid grid-flow-col leading-10">
        {/* <div className="p-4 w-full col-span-1 h-screen">
          <div className="p-4 w-full bg-purple-100 rounded-xl h-full">
            <Sidebar />
          </div>
        </div> */}
        <div className="p-4 w-full col-span-3 h-screen">
          <div className="p-4 w-full bg-purple-50 rounded-xl h-full overflow-auto">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
