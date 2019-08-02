import * as React from "react";
import "./_modal.scss";

export default class Modal extends React.Component<any, any> {
    render() {
        const { header, children, handleClose, show } = this.props;

        return show ? (
            <div className="modal">
                <div className="modal__background" onClick={handleClose}></div>
                <div className="modal__card">
                    <div className="modal__header">{header}</div>
                    <div className="modal__content">{children}</div>
                </div>
            </div>
        ) : null;
    }
}