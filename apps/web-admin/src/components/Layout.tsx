import SideNav from "./SideNav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex h-screen p-10 bg-[#EFF4FF]">
      <SideNav />
      <div className="w-[calc(100vw-17vw)] bg-white flex flex-col px-16 py-10 overflow-auto">
        {children}
      </div>
    </div>
  );
}
