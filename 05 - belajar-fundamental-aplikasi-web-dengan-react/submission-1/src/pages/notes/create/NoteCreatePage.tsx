import { Fragment } from "react/jsx-runtime";
import FormCreate from "../../../components/FormCreate";
import { addNote } from "../../../utils/localData";

const NoteCreatePage = () => {
  return (
    <Fragment>
      <FormCreate createNote={addNote} />
    </Fragment>
  );
};

export default NoteCreatePage;
