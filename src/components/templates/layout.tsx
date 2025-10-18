type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 min-w-screen">
        <h1 className="text-2xl font-bold">Minecol WebApp</h1>
      </header>
      <main className="flex-grow p-4 bg-gray-100">{children}</main>
      <footer className="bg-gray-200 text-center p-4">
        <p className="text-sm text-gray-600">
          © 2024 Minecol. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
