import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";

export function MoreDialog({ description }: { description: string }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            {/* <Button onClick={handleOpen} variant="gradient"> */}
            <Typography placeholder={""} as="a" onClick={handleOpen} variant="small" color="blue-gray" className="font-medium mb-4">
                More
            </Typography>
            {/* </Button> */}
            <Dialog
                placeholder={""}
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader placeholder={""} className="ml-4">More data</DialogHeader>
                <DialogBody placeholder={""}>
                    <p><Typography
                        placeholder={""}
                        variant="h5"
                        color="blue-gray"
                        className="font-bold  w-[42rem]"
                    >Description:</Typography></p>
                    {
                        description
                    }
                </DialogBody>
                <DialogFooter placeholder={""}>
                    <Button
                        placeholder={""}
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    {/* <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button> */}
                </DialogFooter>
            </Dialog>
        </>
    );
}
