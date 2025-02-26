const NavButton = (props: {
  name: string;
  active: string;
  toggleActive: (name: string) => void;
}) => {
  const { name, active, toggleActive } = props;
  return (
    <div
      onClick={() => toggleActive(name)}
      className={`border border-SECONDARY_BLUE w-24 py-2 rounded-md bg-SECONDARY hover:bg-SECONDARY_BLUE cursor-pointer flex justify-center items-center ${active === name ? "bg-SECONDARY_BLUE" : ""}`}
    >
      <h1 className="text-sm">{name}</h1>
    </div>
  );
};

export default NavButton;
