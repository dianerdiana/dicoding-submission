import { FormAdd } from "./components/FormAdd";
import { FormSearch } from "./components/FormSearch";
import { Header } from "./components/Header";
import { NoteList } from "./components/NoteList";

function App() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto py-4 font-montserrat ">
      <Header />
      <FormAdd />
      <FormSearch />
      <NoteList />
      <footer>
        <p>Created By Dian Erdiana</p>
      </footer>
    </main>
  );
}

export default App;
