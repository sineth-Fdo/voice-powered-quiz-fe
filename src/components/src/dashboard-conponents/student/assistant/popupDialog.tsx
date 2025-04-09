"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReusableDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  onConfirm: () => void;
}

const PopupDialog: React.FC<ReusableDialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  message,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
      <DialogTrigger className="hidden">Open</DialogTrigger>
      <DialogContent className="bg-[#000000a4] border-2 border-SECONDARY_BLUE w-[100%] h-auto">
        <DialogHeader>
          <DialogTitle className="text-SECONDARY_TEXT">
            <p className="text-lg">{title}</p>
          </DialogTitle>
        </DialogHeader>
        <p className="text-white">{message}</p>
        <DialogFooter>
          <Button variant="default" onClick={onConfirm}>
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PopupDialog;
