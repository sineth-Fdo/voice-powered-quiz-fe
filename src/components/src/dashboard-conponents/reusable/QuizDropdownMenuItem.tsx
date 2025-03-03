import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function QuizDropdownMenuItem(props: { onClick?: () => void; name: string }) {
  const { onClick, name } = props;
  return (
    <>
      <DropdownMenuItem
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <span>{name}</span>
      </DropdownMenuItem>
    </>
  );
}

export default QuizDropdownMenuItem;
