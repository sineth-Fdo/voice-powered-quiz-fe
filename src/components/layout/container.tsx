"use client";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`
            relative
            max-w-[1500px]
            mx-auto
            xl:px-10
            md:px-10
            sm:px-4
            px-6
            h-full
        `}
    >
      {children}
    </div>
  );
};

export default Container;
