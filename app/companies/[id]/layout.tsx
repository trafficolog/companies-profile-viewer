// app/companies/[id]/layout.tsx
export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col items-start justify-start gap-4">
      {children}
    </section>
  );
}