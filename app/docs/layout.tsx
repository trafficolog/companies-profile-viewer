// app/docs/layout.tsx

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-start justify-start gap-4">
      {children}
    </section>
  );
}
