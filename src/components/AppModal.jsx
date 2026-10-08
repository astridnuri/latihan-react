//props
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// import { Modal, Button } from "react-bootstrap";
import { Button } from "./ui/button";

const AppModal = ({ show, onClose, title, children, submitLabel = "Save", cancelLabel="Cancel", onSubmit, isLoading = false, showFooter = true }) => {
    return (
      <Dialog open={show} openChange={onClose}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {/* <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription> */}
          </DialogHeader>
          <form action="" onSubmit={onSubmit}>
            <div className="py-2">{children}</div>
            <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading...": submitLabel}
                </Button>
                <Button variant="outline" onClick={()=> onClose(false)}>
                    {cancelLabel}
                </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      //   <Modal show={show} onHide={onClose} size={size}>
      //     <Modal.Header closeButton>
      //       <Modal.Title>{title}</Modal.Title>
      //     </Modal.Header>

      //     <form onSubmit={onSubmit}>
      //         <Modal.Body>
      //             {children}
      //         </Modal.Body>

      //     {showFooter && (
      //         <Modal.Footer>
      //         <Button variant="secondary" onClick={onClose}>
      //             {cancelLabel}
      //         </Button>
      //         <Button type="submit" variant="primary" disabled={isLoading} >
      //             {isLoading ? "Saving..." : submitLabel}
      //         </Button>
      //         </Modal.Footer>
      //     )}

      //     </form>

      //   </Modal>
    );
}

export default AppModal