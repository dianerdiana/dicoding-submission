const NoteCategory = ({
  children,
  title,
  icon: Icon,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <section className="mt-5">
      <h2 className="flex mb-2 text-xl font-semibold text-primary dark:text-gray-100">
        <Icon className="me-2" /> <span>{title}</span>
      </h2>
      {children}
    </section>
  );
};

export default NoteCategory;
