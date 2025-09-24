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
      <h2 className="font-semibold text-xl text-primary mb-2 flex">
        <Icon className="me-2" /> <span>{title}</span>
      </h2>
      {children}
    </section>
  );
};

export default NoteCategory;
