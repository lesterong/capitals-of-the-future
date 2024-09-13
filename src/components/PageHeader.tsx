const Root = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="pt-32 pb-6 md:mt-[-54px]">
      {children}
    </header>
  );
};

const Image = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="h-[50vh] w-full absolute top-0 left-0 -z-10 before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-black/60">
      {children}
    </div>
  );
};

const Content = ({ children }: { children?: React.ReactNode }) => {
  return <div className="max-w-6xl px-4 mx-auto">{children}</div>;
};

export { Root, Image, Content };
