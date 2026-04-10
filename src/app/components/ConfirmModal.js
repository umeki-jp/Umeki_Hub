"use client";

/**
 * 確認モーダル（window.confirm の代替）
 *
 * Props:
 *   isOpen      - 表示フラグ
 *   title       - モーダルタイトル
 *   message     - 確認メッセージ（改行は \n で）
 *   confirmLabel - 確認ボタンのラベル（default: "確認"）
 *   cancelLabel  - キャンセルボタンのラベル（default: "キャンセル"）
 *   onConfirm   - 確認ボタン押下時のコールバック
 *   onCancel    - キャンセル / 閉じる時のコールバック
 *   danger      - true のとき確認ボタンを赤色にする（default: false）
 */
export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = '確認',
  cancelLabel = 'キャンセル',
  onConfirm,
  onCancel,
  danger = false,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <h2 id="modal-title" className="text-xl font-black text-white">
          {title}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
          {message}
        </p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 hover:text-white transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition ${
              danger
                ? 'bg-red-600 hover:bg-red-500'
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
