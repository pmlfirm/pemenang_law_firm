export default function Template({ children }: { children: React.ReactNode }) {
  return <main className="page-transition flex-1 overflow-x-clip">{children}</main>
}
