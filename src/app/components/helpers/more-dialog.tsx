import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography
} from "@material-tailwind/react";

export function MoreDialog({
  description,
  source,
  isLoggedIn
}: {
  description: string;
  source: string;
  isLoggedIn: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient"> */}
      <Typography
        placeholder={""}
        as="a"
        onClick={handleOpen}
        variant="small"
        color="blue-gray"
        className="font-medium mb-4"
      >
        More
      </Typography>
      {/* </Button> */}
      <Dialog
        placeholder={""}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}
      >
        <DialogHeader placeholder={""} className="ml-4">
          Additional Data
        </DialogHeader>
        <DialogBody placeholder={""}>
          {description ? (
            <>
              <p>
                <Typography
                  placeholder={""}
                  variant="h5"
                  color="blue-gray"
                  className="font-bold  w-[42rem] mb-8"
                >
                  Description:
                </Typography>
              </p>
              {description}
            </>
          ) : (
            <></>
          )}
          {source === "emf" && isLoggedIn ? (
            <Button
              placeholder={""}
              variant="text"
              className="mt-4 btn font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50"
            >
              Download Data
            </Button>
          ) : (
            <></>
          )}
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
