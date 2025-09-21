function App() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto py-4 font-montserrat ">
      <h1 className="font-bold text-4xl text-primary mb-5">Note App</h1>
      <section className="rounded-2xl shadow-2xl bg-secondary px-9 py-10">
        <h1 className="font-semibold text-3xl text-primary mb-2">Add a Note</h1>
        <form className="flex flex-col">
          <input
            name="title"
            id="title"
            placeholder="Title"
            className="text-2xl mb-4 text-primary border-none outline-none"
          />
          <textarea
            name="body"
            id="body"
            rows={3}
            placeholder="Take a note..."
            className="text-xl text-primary border-none outline-none"
          ></textarea>
          <div className="flex justify-end mt-5">
            <button className="border-none outline-none bg-primary rounded-md text-secondary px-8 py-2">
              Save
            </button>
          </div>
        </form>
      </section>
      <section className="rounded-2xl shadow-2xl bg-secondary px-5 py-5 mt-5">
        <h1 className="font-semibold text-xl text-primary mb-2">Search Note</h1>
        <form>
          <input
            name="search"
            id="search"
            placeholder="Search Title..."
            className="text-lg mb-4 text-primary border-none outline-none"
          />
        </form>
      </section>
      <section className="mt-5">
        <h2 className="font-semibold text-xl text-primary mb-2 flex">
          <img src="" alt="File Text Icon" /> <span>My Notes</span>
        </h2>
        <ul className="flex flex-wrap">
          <li className="rounded-2xl bg-secondary w-4/12 p-5">
            <section className="flex justify-between">
              <h3 className="text-primary font-semibold text-2xl flex-1">
                Feedbacks
              </h3>
              <div className="flex">
                <img src="" alt="Archive Icon" />
                <img src="" alt="Delete Icon" />
              </div>
            </section>
            <p>Note Body</p>
            <p>Note Time</p>
          </li>
        </ul>
      </section>

      <footer>
        <p>Created By Dian Erdiana</p>
      </footer>
    </main>
  );
}

export default App;
