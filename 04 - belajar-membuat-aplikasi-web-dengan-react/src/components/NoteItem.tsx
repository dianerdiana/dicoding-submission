export const NoteItem = () => {
  return (
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
  );
};
