function ModalAlert({
  show,
  type = 'info',
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'Ya',
  confirmVariant = 'danger'
}) {
  if (!show) return null;

  const headerColor = {
    info: 'bg-primary',
    success: 'bg-success',
    error: 'bg-danger',
    warning: 'bg-warning'
  }[type];

  return (
    <div className="modal-backdrop show">
      <div className="modal d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className={`modal-header ${headerColor} text-white`}>
              <h5 className="modal-title">{title}</h5>
              <button
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              <p>{message}</p>
            </div>

            <div className="modal-footer">
              {/* Batal / Tutup */}
              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Batal
              </button>

              {/* 🔥 MUNCUL HANYA JIKA KONFIRMASI */}
              {onConfirm && (
                <button
                  className={`btn btn-${confirmVariant}`}
                  onClick={onConfirm}
                >
                  {confirmText}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAlert;
