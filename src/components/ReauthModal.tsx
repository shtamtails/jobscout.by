import { Modal } from "@mantine/core";

import { IReauthModal } from "../interface/IModals";
import { ReauthForm } from "./Forms/ReauthForm";

export const ReauthModal: React.FC<IReauthModal> = ({ callback, modal, setModal }) => {
  return (
    <>
      <Modal centered opened={modal} onClose={() => setModal(false)} title="Confirm action">
        <ReauthForm callback={callback} setModal={setModal} />
      </Modal>
    </>
  );
};
